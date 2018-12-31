import { TestBed, inject } from '@angular/core/testing';

import { ObjectToFormGroupService } from './object-to-form-group.service';

describe('ObjectToFormGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectToFormGroupService]
    });
  });

  it('should be created', inject([ObjectToFormGroupService], (service: ObjectToFormGroupService) => {
    expect(service).toBeTruthy();
  }));
});
