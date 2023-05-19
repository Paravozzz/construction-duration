import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertDialogTemplateComponent } from './ui/aler-dialog-template/alert-dialog-template.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AlertDialogTemplateComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
