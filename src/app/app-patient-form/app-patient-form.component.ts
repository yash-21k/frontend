import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-app-patient-form',
  templateUrl: './app-patient-form.component.html',
  styleUrls: ['./app-patient-form.component.css']
})
export class AppPatientFormComponent {
  patientForm: FormGroup;
  showError: boolean | undefined;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, public httpService: HttpService) {
    this.patientForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.maxLength(100)]],
      patientRegisteredNumber: ['', [Validators.required, Validators.min(1)]],
      patientAge: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      patientGender: ['', Validators.required],
      patientAddress: ['', [Validators.required, Validators.maxLength(200)]],
      patientAdmission: ['', Validators.required],
      patientDischarge: ['', Validators.required],
      patientConsultedBy: ['', Validators.required],
      diagnosis: ['', Validators.required],
      clinicalSummary: ['', Validators.required],
      vision: ['', Validators.required],
      k1: ['', Validators.required],
      k2: ['', Validators.required],
      axl: ['', Validators.required],
      iol: ['', Validators.required],
      fundus: ['', Validators.required],
      sac: ['', Validators.required],
      iop: ['', Validators.required],
      hb: ['', Validators.required],
      bsl: ['', Validators.required],
      urineType: ['', Validators.required],
      rx:['', Validators.required],
      operationNotes: ['', Validators.required],
      postOperationNotes: ['', Validators.required],
      followUp: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      // Prepare data for submission
      const formData = this.patientForm.value;

      // Check if the times are being populated
      console.log('Submitting data:', formData); // Debugging line

      this.httpService.addPatient(formData).subscribe((data: any) => {

        console.log('Response data:', data); // Debugging line
        this.patientForm.reset();
      }, error => {
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

  get formControls() {
    return this.patientForm.controls;
  }
}
