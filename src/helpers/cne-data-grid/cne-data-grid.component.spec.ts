import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CneDataGridComponent } from './cne-data-grid.component';

describe('CneDataGridComponent', () => {
  let component: CneDataGridComponent;
  let fixture: ComponentFixture<CneDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CneDataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CneDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
