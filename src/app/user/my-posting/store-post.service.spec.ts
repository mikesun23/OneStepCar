import { TestBed, inject } from '@angular/core/testing';

import { StorePostService } from './store-post.service';

describe('StorePostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorePostService]
    });
  });

  it('should be created', inject([StorePostService], (service: StorePostService) => {
    expect(service).toBeTruthy();
  }));
});
