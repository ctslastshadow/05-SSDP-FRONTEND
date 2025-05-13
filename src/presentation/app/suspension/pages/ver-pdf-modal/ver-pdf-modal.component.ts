import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-pdf-modal',
  templateUrl: './ver-pdf-modal.component.html',
  styleUrls: ['./ver-pdf-modal.component.scss']
})
export class VerPdfModalComponent {

  constructor(
    public dialogRef: MatDialogRef<VerPdfModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  public sanitizer: DomSanitizer,) { }

  cerrar(): void {
    this.dialogRef.close();
  }
}

