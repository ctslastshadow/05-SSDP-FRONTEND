import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSuspensionComponent } from './consulta-suspension.component';

describe('ConsultaSuspensionComponent', () => {
  let component: ConsultaSuspensionComponent;
  let fixture: ComponentFixture<ConsultaSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaSuspensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
