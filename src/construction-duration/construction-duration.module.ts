import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConstructionDurationRoutingModule} from './construction-duration-routing.module';
import {ConstructionDurationComponent} from './ui/construction-duration/construction-duration.component';
import {SnipTableComponent} from './ui/snip-table/snip-table.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ObjectRecordComponent} from './ui/object-record/object-record.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ObjectsContainerComponent} from './ui/objects-container/objects-container.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ConstructionDurationComponent,
    SnipTableComponent,
    ObjectRecordComponent,
    ObjectsContainerComponent
  ],
  exports: [
    ConstructionDurationComponent
  ],
  imports: [
    CommonModule,
    ConstructionDurationRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule,
    SharedModule,
    MatCardModule
  ]
})
export class ConstructionDurationModule {
}
