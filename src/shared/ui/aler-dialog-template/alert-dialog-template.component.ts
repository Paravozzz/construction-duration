import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AlertDialogData} from "../../type/AlertDialogData";

@Component({
  templateUrl: './alert-dialog-template.component.html',
  styleUrls: ['./alert-dialog-template.component.css']
})
export class AlertDialogTemplateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {

  }

  ngOnInit(): void {
  }

}
