import {Component, EventEmitter, Output} from '@angular/core';
import {DialogService} from "../../../core/service/dialog.service";
import {SnipTableComponent} from "../snip-table/snip-table.component";
import {ObjectRecord} from "../../type/object-record";

@Component({
  selector: 'app-objects-container',
  templateUrl: './objects-container.component.html',
  styleUrls: ['./objects-container.component.css']
})
export class ObjectsContainerComponent {

  records: ObjectRecord[] = [];

  @Output() recordsChanged: EventEmitter<ObjectRecord[]> = new EventEmitter();

  constructor(private dialogService: DialogService) {
  }

  openSnipTable() {
    const dialogRef = this.dialogService.openDialog(SnipTableComponent);
    dialogRef.afterClosed().subscribe(record => {
      if (!record)
        return;
      this.addRecord(record);
    });
  }

  deleteRecord(record: ObjectRecord) {
    const index = this.records.findIndex(value => value === record);
    if (index === -1)
      return;

    this.records.splice(index, 1);
  }

  private addRecord(record: ObjectRecord) {
    this.records.push(record);
    this.recordsChanged.emit(this.records);
  }
}
