import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgTerminal } from 'ng-terminal';
import { FormControl } from '@angular/forms';
import { DisplayOption } from 'ng-terminal';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Terminal } from 'xterm';
import { FunctionsUsingCSI } from 'ng-terminal';

@Component({
  selector: 'app-root',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, AfterViewInit {
  title = 'NgTerminal Live Example';
  color = 'accent';
  
  public resizable: boolean;
  public fixed = false;

  disabled = false;
  rowsControl = new FormControl();
  colsControl = new FormControl();
  inputControl = new FormControl();

  displayOption: DisplayOption = {};
  displayOptionBounded: DisplayOption = {};//now it's not used
  underlying: Terminal;

  @ViewChild('term') child: NgTerminal;
  @ViewChild('term2') child2: NgTerminal;
  @ViewChild('term3') child3: NgTerminal;
  @ViewChild('term4') child4: NgTerminal;


  constructor() { }

  ngOnInit() {
    this.rowsControl.setValue(10);
    this.colsControl.setValue(40);
  }

  ngAfterViewInit() {
    this.underlying = this.child.underlying;
    this.underlying.setOption("fontSize", 20);
    this.invalidate();
    this.child.write('$ ');
    this.child.keyInput.subscribe((input) => {
      //do nothing because it will be replaced keyEventInput
    })
    this.child.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child.underlying.buffer.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (printable) {
        this.child.write(e.key);
      }
    })

    
    this.child2.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child2.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child2.underlying.buffer.cursorX > 2) {
          this.child2.write('\b \b');
        }
      } else if (printable) {
        this.child2.write(e.key);
      }
    })
    this.child3.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child3.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child3.underlying.buffer.cursorX > 2) {
          this.child3.write('\b \b');
        }
      } else if (printable) {
        this.child3.write(e.key);
      }
    })
    this.child4.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child4.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child4.underlying.buffer.cursorX > 2) {
          this.child4.write('\b \b');
        }
      } else if (printable) {
        this.child4.write(e.key);
      }
    })

    this.rowsControl.valueChanges.subscribe(() => { this.invalidate() });
    this.colsControl.valueChanges.subscribe(() => { this.invalidate() });
  }

  invalidate() {
    if (this.resizable)
      this.displayOption.activateDraggableOnEdge = { minWidth: 100, minHeight: 100 };
    else
      this.displayOption.activateDraggableOnEdge = undefined;
    if (this.fixed)
      this.displayOption.fixedGrid = { rows: this.rowsControl.value, cols: this.colsControl.value };
    else
      this.displayOption.fixedGrid = undefined;
    this.child.setDisplayOption(this.displayOption);
    this.child2.setDisplayOption(this.displayOption);
    this.child3.setDisplayOption(this.displayOption);
    this.child4.setDisplayOption(this.displayOption);
  }

  resizableChange(event: MatSlideToggleChange) {
    this.resizable = event.checked;
    if (this.resizable)
      this.fixed = false;
    this.invalidate();
  }

  fixedChange(event: MatSlideToggleChange) {
    this.fixed = event.checked;
    if (this.fixed)
      this.resizable = false;
    this.invalidate();
  }

  writeSubject = new Subject<string>();
  write() {
    this.writeSubject.next(eval(`'${this.inputControl.value}'`));
  }

  keyInput: string;
  onKeyInput(event: string) {
    this.keyInput = event;
  }

  get displayOptionForLiveUpdate() {
    return JSON.parse(JSON.stringify(this.displayOption));
  }
}
