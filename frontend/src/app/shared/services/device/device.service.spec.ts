import { TestBed } from '@angular/core/testing';

import { deviceDataClient } from './device.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('deviceDataClient', () => {
  let service: deviceDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(deviceDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
