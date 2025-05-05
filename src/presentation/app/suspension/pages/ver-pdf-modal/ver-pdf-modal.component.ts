import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-pdf-modal',
  template: `
    <h2 mat-dialog-title>Documento PDF</h2>
    <mat-dialog-content>
      <iframe
        *ngIf="pdfSrc"
        [src]="pdfSrc"
        width="100%"
        height="600px"
        style="border: none;"
      ></iframe>
    </mat-dialog-content>
  `
})
export class VerPdfModalComponent {
  pdfSrc: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { base64: string }) {
    const byteCharacters = atob(data.base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    this.pdfSrc = URL.createObjectURL(blob);
  }
}