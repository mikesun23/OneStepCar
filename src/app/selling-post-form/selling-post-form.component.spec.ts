import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingPostFormComponent } from './selling-post-form.component';

describe('SellingPostFormComponent', () => {
  let component: SellingPostFormComponent;
  let fixture: ComponentFixture<SellingPostFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingPostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
