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

  @Output() add: EventEmitter<ObjectRecord> = new EventEmitter();
  @Output() remove: EventEmitter<ObjectRecord> = new EventEmitter();
  @Output() edit: EventEmitter<ObjectRecord> = new EventEmitter();

  constructor(private dialogService: DialogService) {
  }

  openSnipTable() {
    const dialogRef = this.dialogService.openDialog(SnipTableComponent);
    dialogRef.afterClosed().subscribe(record => {
      if (!record)
        return;
      this.addRecord(JSON.parse(JSON.stringify(record)));
    });
  }

  onRecorChanged(record: ObjectRecord): void {
    const index = this.records.findIndex(value => value.id === record.id);
    if (index === -1)
      return;
    
    this.records[index].name = record.name;
    this.records[index].value = record.value;
    this.edit.emit(this.records[index]);
  }

  removeRecord(record: ObjectRecord) {
    const index = this.records.findIndex(value => value.id === record.id);
    if (index === -1)
      return;

    this.remove.emit(this.records.splice(index, 1)[0]);
  }

  private addRecord(record: ObjectRecord) {
    record.id = window.performance.now();
    this.records.push(record);
    this.add.emit(record);
  }
}
