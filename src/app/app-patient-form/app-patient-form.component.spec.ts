import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPatientFormComponent } from './app-patient-form.component';

describe('AppPatientFormComponent', () => {
  let component: AppPatientFormComponent;
  let fixture: ComponentFixture<AppPatientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPatientFormComponent]
    });
    fixture = TestBed.createComponent(AppPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
