import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalReviewPageComponent } from './final-review-page.component';

describe('FinalReviewPageComponent', () => {
  let component: FinalReviewPageComponent;
  let fixture: ComponentFixture<FinalReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
