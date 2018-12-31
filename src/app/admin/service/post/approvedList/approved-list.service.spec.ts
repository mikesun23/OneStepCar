import { TestBed, inject } from '@angular/core/testing';

import { ApprovedListingService } from './approved-list.service';

describe('LiveListingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovedListingService]
    });
  });

  it('should be created', inject([ApprovedListingService], (service: ApprovedListingService) => {
    expect(service).toBeTruthy();
  }));
});
