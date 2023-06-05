import {Component, OnInit} from '@angular/core';
import {ObjectRecord} from "../../type/object-record";
import {DialogService} from "../../../core/service/dialog.service";
import {AlertDialogTemplateComponent} from "../../../shared/ui/aler-dialog-template/alert-dialog-template.component";
import { SingleDurationCalculator } from 'src/construction-duration/classes/single-duration-calculator';

@Component({
  selector: 'app-construction-duration',
  templateUrl: './construction-duration.component.html',
  styleUrls: ['./construction-duration.component.css']
})
export class ConstructionDurationComponent implements OnInit {
  private records: ObjectRecord[]=[];

  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  calculate() {
    if (!this.records || this.records.length === 0) {
      this.dialogService.openDialog(AlertDialogTemplateComponent, {
        data: {
          message: "Сначала добавьте хотя бы один объект!",
          buttonText: "Ok"
        }
      })
      return;
    }
    let result: string[] = [];
    for (const record of this.records) {
      const calculator = new SingleDurationCalculator(record);
      calculator.calculate();
      result.push(calculator.text);
    }

    if (result.length === 0)
      return;

    this.dialogService.openDialog(AlertDialogTemplateComponent, {
      data: {
        title: "Результаты расчёта",
        message: result.join("\n\n"),
        buttonText: "Ok"
      }
    })

  }

  onObjContainerAddRecord(record: ObjectRecord) {
      this.records.push(record);
  }

  onObjContainerRemoveRecord(record: ObjectRecord) {
    const index = this.records.findIndex(value => value.id === record.id);
    if (index === -1)
      return;

    this.records.splice(index, 1);
  }

  onObjContainerEditRecord(record: ObjectRecord) {
    const index = this.records.findIndex(value => value.id === record.id);
    if (index === -1)
      return;

    this.records[index]=record;
  }    
}
