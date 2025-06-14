import { TestBed } from '@angular/core/testing';
import { MovieDataClient } from './movie.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('movieDataClient', () => {
  let service: MovieDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieDataClient,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(MovieDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
