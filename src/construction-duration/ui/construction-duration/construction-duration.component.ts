import {Component, OnInit} from '@angular/core';
import {ObjectRecord} from "../../type/object-record";
import {DialogService} from "../../../core/service/dialog.service";
import {AlertDialogTemplateComponent} from "../../../shared/ui/aler-dialog-template/alert-dialog-template.component";

@Component({
  selector: 'app-construction-duration',
  templateUrl: './construction-duration.component.html',
  styleUrls: ['./construction-duration.component.css']
})
export class ConstructionDurationComponent implements OnInit {

  private records?: ObjectRecord[];

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

    


  }

  updateObjects(objects: ObjectRecord[]) {
    if (!objects)
      this.records = undefined;
  }
}
