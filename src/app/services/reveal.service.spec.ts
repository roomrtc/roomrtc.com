import { TestBed, inject } from '@angular/core/testing';

import { RevealService } from './reveal.service';

describe('RevealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevealService]
    });
  });

  it('should be created', inject([RevealService], (service: RevealService) => {
    expect(service).toBeTruthy();
  }));
});
