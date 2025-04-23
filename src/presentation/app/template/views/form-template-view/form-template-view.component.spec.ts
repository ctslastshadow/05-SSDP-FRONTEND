import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateViewComponent } from './form-template-view.component';

describe('FormTemplateViewComponent', () => {
  let component: FormTemplateViewComponent;
  let fixture: ComponentFixture<FormTemplateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTemplateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
