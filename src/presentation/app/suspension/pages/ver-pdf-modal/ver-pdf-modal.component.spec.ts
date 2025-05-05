import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPdfModalComponent } from './ver-pdf-modal.component';

describe('VerPdfModalComponent', () => {
  let component: VerPdfModalComponent;
  let fixture: ComponentFixture<VerPdfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPdfModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
