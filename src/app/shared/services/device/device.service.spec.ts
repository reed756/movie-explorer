import { TestBed } from '@angular/core/testing';

import { deviceDataClient } from './device.service';

describe('deviceDataClient', () => {
  let service: deviceDataClient;

  beforeEach(() => {
    service = TestBed.inject(deviceDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
