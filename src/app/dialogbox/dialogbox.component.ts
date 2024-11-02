import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {
  @Input() isVisible: boolean = false; // Input to control visibility
  patientId: string = ''; // Variable to hold the patient ID
  @Output() generatePDF = new EventEmitter<string>(); // Output to emit the patient ID

  close() {
    this.isVisible = false; // Method to close the dialog
    this.reset(); // Reset the patient ID when closing
  }

  onGeneratePDF() {
    if (this.patientId) { // Only emit if patientId is not empty
      this.generatePDF.emit(this.patientId); // Emit the patient ID
      this.close(); // Close the dialog after generating PDF
    } else {
      alert('Please enter a Patient ID!'); // Alert if patient ID is empty
    }
  }

  reset() {
    this.patientId = ''; // Reset the patient ID
  }
}
