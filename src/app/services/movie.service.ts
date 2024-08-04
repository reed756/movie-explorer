import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, filter, map, shareReplay, switchMap, tap, throwError } from 'rxjs';
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
  isLoading = signal<boolean>(false);

  public searchResults$ = toObservable(this.searchTerm).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    switchMap(searchTerm => this.http.get<MovieResponse>(`${this.apiUrl}search/movie?query=${searchTerm}`, this.options)),
    map(data =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => throwError(() => new Error(err)))
  );

  private movieSelected$ = toObservable(this.selectedMovieId).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    switchMap(movieId => this.http.get<Movie>(`${this.apiUrl}movie/${movieId}`, this.options)),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => throwError(() => new Error(err)))
  )

  private trendingMoviesToday$ = this.http.get<MovieResponse>(`${this.apiUrl}trending/movie/day`, this.options).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => throwError(() => new Error(err.status_message)))
  );

  private trendingMoviesThisWeek$ = this.http.get<MovieResponse>(`${this.apiUrl}trending/movie/week`, this.options).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => throwError(() => new Error(err)))
  );

  private popularMovies$ = this.http.get<MovieResponse>(`${this.apiUrl}movie/popular`, this.options).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => throwError(() => new Error(err)))
  );

  private popularMoviesInTheaters$ = this.http.get<MovieResponse>(`${this.apiUrl}movie/now_playing`, this.options).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => throwError(() => new Error(err)))
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
