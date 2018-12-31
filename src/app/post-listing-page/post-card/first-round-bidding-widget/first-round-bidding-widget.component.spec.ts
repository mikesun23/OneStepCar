import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRoundBiddingWidgetComponent } from './first-round-bidding-widget.component';

describe('FirstRoundBiddingWidgetComponent', () => {
  let component: FirstRoundBiddingWidgetComponent;
  let fixture: ComponentFixture<FirstRoundBiddingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstRoundBiddingWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstRoundBiddingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
