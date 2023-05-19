import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openDialog<T, D = any>(component: ComponentType<T>, config?: MatDialogConfig<D>):MatDialogRef<T> {
    return this.dialog.open(component, config);
  }


}
