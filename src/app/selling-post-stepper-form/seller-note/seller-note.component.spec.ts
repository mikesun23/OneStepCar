import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerNoteComponent } from './seller-note.component';

describe('SellerNoteComponent', () => {
  let component: SellerNoteComponent;
  let fixture: ComponentFixture<SellerNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
