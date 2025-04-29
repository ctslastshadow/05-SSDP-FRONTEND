import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRestitucionComponent } from './consulta-restitucion.component';

describe('ConsultaRestitucionComponent', () => {
  let component: ConsultaRestitucionComponent;
  let fixture: ComponentFixture<ConsultaRestitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaRestitucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaRestitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
