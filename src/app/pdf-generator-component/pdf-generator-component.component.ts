import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../http.service";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdfviewer',
  template: `
    <button (click)="generatePDF()">Generate PDF</button>
    <div *ngIf="pdfSrc" style="margin-top: 20px;">
      <iframe [src]="pdfSrc" width="100%" height="500px"></iframe>
    </div>
  `,
})
export class PdfGeneratorComponentComponent implements OnInit {
  pdfSrc: string | null = null; // To hold the PDF Blob URL for preview
  @Input() patientId: any; // To store the patient ID
  patientData: any; // To hold the fetched patient data

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    if (this.patientId) {
      this.getPatientData(this.patientId); // Fetch patient data when patientId is received
    }
  }

  getPatientData(patientId: any) {
    this.httpService.getPatientById(patientId).subscribe(data => {
      this.patientData = data; // Store the fetched data
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    // Check if patientData is available
    if (this.patientData) {
      doc.setFontSize(18);
      doc.text('Patient Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Name: ${this.patientData.name}`, 20, 40);
      doc.text(`Age: ${this.patientData.age}`, 20, 50);
      doc.text(`Diagnosis: ${this.patientData.diagnosis}`, 20, 60);
      // Add more fields as needed...

      // Generate PDF as Blob
      const pdfBlob = doc.output('blob');
      this.pdfSrc = URL.createObjectURL(pdfBlob); // Create a Blob URL for preview
    } else {
      console.error('Patient data not available');
    }
  }
}
