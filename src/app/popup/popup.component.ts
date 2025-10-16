import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, 
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
 } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  data = inject(MAT_DIALOG_DATA);
}
