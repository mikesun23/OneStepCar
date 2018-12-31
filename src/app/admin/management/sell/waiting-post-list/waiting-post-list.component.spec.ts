import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPostListComponent } from './waiting-post-list.component';

describe('WaitingPostListComponent', () => {
  let component: WaitingPostListComponent;
  let fixture: ComponentFixture<WaitingPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
