import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model, signal } from '@angular/core';
import { BehaviorSubject, catchError, filter, forkJoin, map, observeOn, shareReplay, switchMap, takeUntil, tap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Movie, MovieResponse } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  private options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDA5YzY0M2UzNzVkOTE3ZGMxNWQ3OWMxYWI0OWNhNCIsInN1YiI6IjY1YTgxZGQ0MWJmODc2MDEyM2M5YzY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqN1Xviii_ZwRZFvts-oS7fI5jQV61zpsXI46Y6Mcl0'
    }
  };

  private apiUrl: string = 'https://api.themoviedb.org/3/';
  searchTerm = signal<string | null | undefined>(undefined);
  selectedMovieId = signal<number | undefined>(undefined);

  public searchResults$ = toObservable(this.searchTerm).pipe(
    filter(Boolean),
    switchMap(searchTerm => {
      console.log(`Searching for: ${searchTerm}`);
      return this.http.get<MovieResponse>(`${this.apiUrl}search/movie?query=${searchTerm}`, this.options)
    }
    ),
    map(data => {
      console.log('Received data:', data);
      const results = data.results.map((movie: Movie) => ({
        ...movie
      }))
      console.log('results?', results);
      return results;
    }
    ),
    shareReplay(1)
  );

  private movieSelected$ = toObservable(this.selectedMovieId).pipe(
    filter(Boolean),
    switchMap(movieId => this.http.get<Movie>(`${this.apiUrl}movie/${movieId}`, this.options)),
    shareReplay(1)
  )

  private trendingMoviesToday$ = this.http.get<MovieResponse>(`${this.apiUrl}trending/movie/day`, this.options).pipe(
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    shareReplay(1),
  );

  private trendingMoviesThisWeek$ = this.http.get<MovieResponse>(`${this.apiUrl}trending/movie/week`, this.options).pipe(
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    shareReplay(1)
  );

  private popularMovies$ = this.http.get<MovieResponse>(`${this.apiUrl}movie/popular`, this.options).pipe(
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    shareReplay(1)
  );

  private popularMoviesInTheaters$ = this.http.get<MovieResponse>(`${this.apiUrl}movie/now_playing`, this.options).pipe(
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    shareReplay(1)
  );

  // Converted Signals
  trendingMoviesToday = toSignal(this.trendingMoviesToday$, { initialValue: [] as Movie[] });
  trendingMoviesThisWeek = toSignal(this.trendingMoviesThisWeek$, { initialValue: [] as Movie[] });
  popularMovies = toSignal(this.popularMovies$, { initialValue: [] as Movie[] });
  popularMoviesInTheaters = toSignal(this.popularMoviesInTheaters$, { initialValue: [] as Movie[] });
  searchResults = toSignal(this.searchResults$, { initialValue: [] as Movie[] });
  selectedMovie = toSignal(this.movieSelected$, { initialValue: {} as Movie });

  // Methods
  movieSelected(id: number) {
    this.selectedMovieId.set(id);
  }

  searchTermFilled(searchTerm: string | null | undefined) {
    this.searchTerm.set(searchTerm);
  }

}
