import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListingPageComponent } from './post-listing-page.component';

describe('PostListingPageComponent', () => {
  let component: PostListingPageComponent;
  let fixture: ComponentFixture<PostListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
