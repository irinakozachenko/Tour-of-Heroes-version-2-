import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { PopupModel } from './hero.type';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup(data: PopupModel): MatDialogRef<PopupComponent, any> {
    return this.dialog.open(PopupComponent, { data: data })
  }
}