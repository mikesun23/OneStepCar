import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPostListComponent } from './approved-post-list.component';

describe('ApprovedPostListComponent', () => {
  let component: ApprovedPostListComponent;
  let fixture: ComponentFixture<ApprovedPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
