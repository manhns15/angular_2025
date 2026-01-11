import { TestBed } from '@angular/core/testing';

import { DummyjsonApiService } from './dummyjson-api.service';

describe('DummyjsonApiService', () => {
  let service: DummyjsonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyjsonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
