import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  type: string;
  message: string[] = []
  defaultButtons: string[] = [];
  title: string = '';

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData,
  ) {
    this.type = this.data.type?.toLowerCase() || '';
    this.message = this.data.message || [];
    this.defaultButtons = this.data.defaultButtons || [];
    this.title = this.data.title || '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onClose(result?: boolean) {
    if (result !== undefined)
      this.dialogRef.close(result);
    else
      this.closeDialog();
  }

}

type PopupData = {
  type?: string,
  message?: string[],
  defaultButtons?: string[],
  title?: string,
}