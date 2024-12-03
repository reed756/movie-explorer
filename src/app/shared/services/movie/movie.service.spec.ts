import { TestBed } from '@angular/core/testing';

import { MovieDataClient } from './movie.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie } from '../../interfaces/movie';

describe('movieDataClient', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let movieDataClient: MovieDataClient;

  beforeEach(() => {
    // Create a spy object for HttpClient
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        // Provide the spy object instead of the real HttpClient
        { provide: HttpClient, useValue: httpClientSpy },
        movieDataClient,
      ],
    });

    // Get the movieDataClient instance from the TestBed
    movieDataClient = TestBed.inject(movieDataClient);
  });

  it('should be created', () => {
    expect(movieDataClient).toBeTruthy();
  });

  it('should return expected movies (HttpClient called once)', (done: DoneFn) => {
    const expectedMovies: Movie[] = [
      {
        "adult": false,
        "backdrop_path": "/9R9Za5kybgl5AhuCNoK3gngaBdG.jpg",
        "genre_id": [27, 53],
        "genres": [],
        "media_type": '',
        "runtime": 120,
        "tagline": '',
        "id": 1114513,
        "original_language": "en",
        "original_title": "Speak No Evil",
        "overview": "When an American family is invited to spend the weekend at the idyllic country estate of a charming British family they befriended on vacation, what begins as a dream holiday soon warps into a snarled psychological nightmare.",
        "popularity": 2281.291,
        "poster_path": "/fDtkrO2OAF8LKQTdzYmu1Y7lCLB.jpg",
        "release_date": "2024-09-11",
        "title": "Speak No Evil",
        "video": false,
        "vote_average": 7.334,
        "vote_count": 511
      },
      {
        "adult": false,
        "backdrop_path": "/9R9Za5kybgl5AhuCNoK3gngaBdG.jpg",
        "genre_id": [27, 53],
        "genres": [],
        "media_type": '',
        "runtime": 120,
        "tagline": '',
        "id": 1114513,
        "original_language": "en",
        "original_title": "Speak No Evil",
        "overview": "When an American family is invited to spend the weekend at the idyllic country estate of a charming British family they befriended on vacation, what begins as a dream holiday soon warps into a snarled psychological nightmare.",
        "popularity": 2281.291,
        "poster_path": "/fDtkrO2OAF8LKQTdzYmu1Y7lCLB.jpg",
        "release_date": "2024-09-11",
        "title": "Speak No Evil",
        "video": false,
        "vote_average": 7.334,
        "vote_count": 511
      },
    ];

    // Configure the spy to return an observable of expectedMovies
    httpClientSpy.get.and.returnValue(of(expectedMovies));

    // Call the method and subscribe to the observable
    movieDataClient.popularMovies$.subscribe(
      (movies: Movie[]) => {
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
