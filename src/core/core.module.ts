import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class CoreModule { }
