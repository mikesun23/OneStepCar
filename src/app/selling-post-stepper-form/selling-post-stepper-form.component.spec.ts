import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingPostStepperFormComponent } from './selling-post-stepper-form.component';

describe('SellingPostStepperFormComponent', () => {
  let component: SellingPostStepperFormComponent;
  let fixture: ComponentFixture<SellingPostStepperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingPostStepperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingPostStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
