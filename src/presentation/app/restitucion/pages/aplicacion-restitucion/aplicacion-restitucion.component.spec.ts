import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionRestitucionComponent } from './aplicacion-restitucion.component';

describe('AplicacionRestitucionComponent', () => {
  let component: AplicacionRestitucionComponent;
  let fixture: ComponentFixture<AplicacionRestitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacionRestitucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicacionRestitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
