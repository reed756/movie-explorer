import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('MovieService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let movieService: MovieService;

  beforeEach(() => {
    // Create a spy object for HttpClient
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        // Provide the spy object instead of the real HttpClient
        { provide: HttpClient, useValue: httpClientSpy },
        MovieService,
      ],
    });

    // Get the MovieService instance from the TestBed
    movieService = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should return expected movies (HttpClient called once)', (done: DoneFn) => {
    const expectedMovies: any[] = [
      { id: 1, name: 'Saving Private Ryan' },
      { id: 2, name: 'Star Wars' },
    ];

    // Configure the spy to return an observable of expectedMovies
    httpClientSpy.get.and.returnValue(of(expectedMovies));

    // Call the method and subscribe to the observable
    movieService.fetchData().subscribe(
      (movies) => {
        // Expectations for the returned movies
        expect(movies).toEqual(jasmine.arrayWithExactContents(expectedMovies));

        // Expectation for the number of HttpClient calls
        expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);

        // Call done to complete the asynchronous test
        done();
      },
      fail
    );
  });

});
