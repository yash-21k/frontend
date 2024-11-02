import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGeneratorComponentComponent } from './pdf-generator-component.component';

describe('PdfGeneratorComponentComponent', () => {
  let component: PdfGeneratorComponentComponent;
  let fixture: ComponentFixture<PdfGeneratorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfGeneratorComponentComponent]
    });
    fixture = TestBed.createComponent(PdfGeneratorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
