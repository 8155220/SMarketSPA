import { TestBed, inject } from '@angular/core/testing';

import { SMarketService } from './smarket.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SMarketService]
    });
  });

  it('should be created', inject([SMarketService], (service: SMarketService) => {
    expect(service).toBeTruthy();
  }));
});
