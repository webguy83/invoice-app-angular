import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFromFormComponent } from './bill-from-form.component';

describe('BillFromFormComponent', () => {
  let component: BillFromFormComponent;
  let fixture: ComponentFixture<BillFromFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillFromFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillFromFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
