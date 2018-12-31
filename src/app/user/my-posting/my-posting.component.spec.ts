import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostingComponent } from './my-posting.component';

describe('MyPostingComponent', () => {
  let component: MyPostingComponent;
  let fixture: ComponentFixture<MyPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
