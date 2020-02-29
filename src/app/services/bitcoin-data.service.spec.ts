import { TestBed } from '@angular/core/testing';

import { BitcoinDataService } from './bitcoin-data.service';

describe('BitcoinDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitcoinDataService = TestBed.get(BitcoinDataService);
    expect(service).toBeTruthy();
  });
});
