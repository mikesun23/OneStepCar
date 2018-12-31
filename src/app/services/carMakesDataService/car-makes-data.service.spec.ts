import { TestBed, inject } from '@angular/core/testing';

import { CarMakesDataService } from './car-makes-data.service';

describe('CarMakesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarMakesDataService]
    });
  });

  it('should be created', inject([CarMakesDataService], (service: CarMakesDataService) => {
    expect(service).toBeTruthy();
  }));
});
