import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionSuspensionComponent } from './aplicacion-suspension.component';

describe('AplicacionSuspensionComponent', () => {
  let component: AplicacionSuspensionComponent;
  let fixture: ComponentFixture<AplicacionSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacionSuspensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicacionSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
