import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ObjectRecord} from "../../type/object-record";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-object-record',
  templateUrl: './object-record.component.html',
  styleUrls: ['./object-record.component.css']
})
export class ObjectRecordComponent implements AfterViewInit, OnInit, OnDestroy {
  nameFormControl = new FormControl('', [Validators.required]);
  valueFormControl = new FormControl('', [Validators.required]);
  nameMatcher = new MyErrorStateMatcher();
  valueMatcher = new MyErrorStateMatcher();
  @Input() record: ObjectRecord = <ObjectRecord>{};
  @Input() delete_disabled: boolean = false;
  @Output() clickDelete = new EventEmitter<ObjectRecord>();
  @Output() change = new EventEmitter<ObjectRecord>();
  private nameChangesSubscription?: Subscription;
  private valueChangesSubscription?: Subscription;
  constructor() {
  }

  @ViewChild('objectName') objectName!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => this.objectName.nativeElement.focus(), 0);
  }

  ngOnInit() {
    this.nameChangesSubscription = this.nameFormControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe({
      next: (value)=> {
        this.record.name = value?value:'';
        this.change.emit(this.record);
      }
    });

    this.valueChangesSubscription = this.valueFormControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe({
      next: (value)=> {
        this.record.value = value?value:'';
        this.change.emit(this.record);
      }
    });
  }

  ngOnDestroy(): void {
      this.nameChangesSubscription?.unsubscribe();
      this.valueChangesSubscription?.unsubscribe();
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
