import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ObjectRecord} from "../../type/object-record";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-object-record',
  templateUrl: './object-record.component.html',
  styleUrls: ['./object-record.component.css']
})
export class ObjectRecordComponent implements AfterViewInit, OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  valueFormControl = new FormControl('', [Validators.required]);
  nameMatcher = new MyErrorStateMatcher();
  valueMatcher = new MyErrorStateMatcher();
  @Input() record: ObjectRecord = <ObjectRecord>{};
  @Input() delete_disabled: boolean = false;
  @Output() clickDelete = new EventEmitter<ObjectRecord>();
  constructor() {
  }

  @ViewChild('objectName') objectName!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => this.objectName.nativeElement.focus(), 0);
  }

  ngOnInit() {

  }

  delete() {
    this.clickDelete.emit(this.record);
  }

  edit() {

  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid /*&& (control.dirty || control.touched || isSubmitted)*/);
  }
}
