import { Component } from '@angular/core';
import { HttpService } from './http.service'; // Adjust the import path if necessary
import jsPDF from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isDialogVisible: boolean = false;
  patientId: string | null = null;
  pdfSrc: SafeResourceUrl | null = null;
  patientData: any;

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer) {}

  openDialog() {
    this.isDialogVisible = true;
  }

  onPatientIdSubmitted(id: string) {
    this.patientId = id;
    this.getPatientData(this.patientId);
  }

  getPatientData(patientId: string) {
    this.httpService.getPatientById(patientId).subscribe(data => {
      this.patientData = data;
    });
  }

  generatePDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Title for the PDF
    doc.setFontSize(18);
    doc.text('Patient Discharge Summary', 10, 20);
    doc.setFontSize(12);

    let yPosition = 40; // Initial y position
    const textAreaHeight = 287; // Maximum height before a new page is needed

    // Add patient information
    yPosition = this.addPatientInfo(doc, yPosition);
    yPosition = this.addInvestigations(doc, yPosition, textAreaHeight);
    yPosition = this.addOperationNotes(doc, yPosition, textAreaHeight);
    yPosition = this.addTreatmentGiven(doc, yPosition, textAreaHeight);
    yPosition = this.addPostOpInstructions(doc, yPosition, textAreaHeight);
    yPosition = this.addFollowUp(doc, yPosition, textAreaHeight);

    // Emergency contact
    doc.text('If any emergency please contact on - 9370018944', 10, yPosition);

    // Generate PDF as Blob and open in a new tab
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }

  private addPatientInfo(doc: jsPDF, yPosition: number): number {
    doc.text(`Name: ${this.patientData.patientName}`, 10, yPosition);
    doc.text(`Reg. No.: ${this.patientData.patientRegisteredNumber}`, 120, yPosition);
    yPosition += 10;
    doc.text(`Age: ${this.patientData.patientAge}`, 10, yPosition);
    doc.text(`Gender: ${this.patientData.patientGender}`, 60, yPosition);
    yPosition += 10;
    doc.text(`Address: ${this.patientData.patientAddress}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Admission Date: ${this.patientData.patientAdmission.split('T')[0]}`, 10, yPosition);
    doc.text(`Admission Time: ${this.patientData.patientAdmission.split('T')[1].slice(0, 5)}`, 100, yPosition);
    yPosition += 10;
    doc.text(`Discharge Date: ${this.patientData.patientDischarge.split('T')[0]}`, 10, yPosition);
    doc.text(`Discharge Time: ${this.patientData.patientDischarge.split('T')[1].slice(0, 5)}`, 100, yPosition);
    yPosition += 10;
    doc.text(`Consulted By: ${this.patientData.patientConsultedBy}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Diagnosis: ${this.patientData.diagnosis}`, 10, yPosition);
    yPosition += 10;

    return yPosition;
  }

  private addInvestigations(doc: jsPDF, yPosition: number, textAreaHeight: number): number {
    const infoHeight = 10; // Each line of investigations height
    doc.text('Investigations:', 10, yPosition);
    yPosition += infoHeight;

    doc.text(`Vision: ${this.patientData.vision}`, 10, yPosition);
    yPosition += infoHeight;
    doc.text(`Fundus: ${this.patientData.fundus}`, 10, yPosition);
    doc.text(`K1: ${this.patientData.k1}`, 60, yPosition);
    doc.text(`K2: ${this.patientData.k2}`, 100, yPosition);
    doc.text(`AXL: ${this.patientData.axl}`, 140, yPosition);
    doc.text(`IOL: ${this.patientData.iol}`, 180, yPosition);
    yPosition += infoHeight;

    // Combine IOP, HB, BSL, and Urine into a single line
    const combinedInvestigations = `IOP: ${this.patientData.iop} mmHg  HB: ${this.patientData.hb}  BSL: ${this.patientData.bsl}  Urine: ${this.patientData.urineType}`;
    doc.text(combinedInvestigations, 10, yPosition);
    yPosition += infoHeight;

    // Add Fundus information
    // doc.text(`Fundus: ${this.patientData.fundus}`, 10, 130);
    // yPosition += infoHeight;

    return yPosition;
  }

  private addOperationNotes(doc: jsPDF, yPosition: number, textAreaHeight: number): number {
    doc.text('Operation Notes:', 10, yPosition);
    yPosition += 10;

    const operationNotes = this.patientData.operationNotes || 'No operation notes provided.';
    this.addMultilineText(doc, operationNotes, 10, yPosition, 5);
    yPosition += (operationNotes.split('\n').length + 1) * 5; // Adjust y position for multiple lines

    return yPosition;
  }

  private addTreatmentGiven(doc: jsPDF, yPosition: number, textAreaHeight: number): number {
    doc.text('Treatment Given:', 10, yPosition);
    yPosition += 10;

    const treatment = this.patientData.rx || 'No treatment details provided.';
    this.addMultilineText(doc, treatment, 10, yPosition, 5);
    yPosition += (treatment.split('\n').length + 1) * 5; // Adjust y position for multiple lines

    return yPosition;
  }

  private addPostOpInstructions(doc: jsPDF, yPosition: number, textAreaHeight: number): number {
    doc.text('Post Op Instructions:', 10, yPosition);
    yPosition += 10;

    const postOpInstructions = this.patientData.postOperationNotes || 'No post-operation instructions provided.';
    this.addMultilineText(doc, postOpInstructions, 10, yPosition, 5);
    yPosition += (postOpInstructions.split('\n').length + 1) * 5; // Adjust y position for multiple lines

    return yPosition;
  }

  private addFollowUp(doc: jsPDF, yPosition: number, textAreaHeight: number): number {
    doc.text('Follow Up:', 10, yPosition);
    yPosition += 10;

    const followUp = this.patientData.followUp || 'No follow-up instructions provided.';
    this.addMultilineText(doc, followUp, 10, yPosition, 5);
    yPosition += (followUp.split('\n').length + 1) * 5; // Adjust y position for multiple lines

    return yPosition;
  }

  private addMultilineText(doc: jsPDF, text: string, x: number, y: number, lineHeight: number) {
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      doc.text(line, x, y + index * lineHeight);
    });
  }
}
