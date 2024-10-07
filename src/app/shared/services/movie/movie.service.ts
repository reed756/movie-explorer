import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, filter, map, Observable, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Movie, MovieResponse } from '../../interfaces/movie';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  private options = {
    headers: {
      accept: 'application/json',
      Authorization: environment.apiKey
    }
  };

  private apiUrl: string = 'https://api.themoviedb.org/3/';
  searchTerm = signal<string | null | undefined>(undefined);
  selectedMovieId = signal<number | undefined>(undefined);
  trendingMovieToggle = signal<string | undefined>('day');
  popularMovieToggle = signal<string | undefined>('now_playing');
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
    catchError(err => this.handleError(err))
  );

  private movieSelected$ = toObservable(this.selectedMovieId).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    switchMap(movieId => this.http.get<Movie>(`${this.apiUrl}movie/${movieId}`, this.options)),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => this.handleError(err))
  )

  private trendingMovies$ = toObservable(this.trendingMovieToggle).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    switchMap(toggle => this.http.get<MovieResponse>(`${this.apiUrl}trending/movie/${toggle}`, this.options)),
    map(data =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => this.handleError(err))
  )

  public popularMovies$ = toObservable(this.popularMovieToggle).pipe(
    tap(() => this.isLoading.set(true)),
    filter(Boolean),
    switchMap(toggle => this.http.get<MovieResponse>(`${this.apiUrl}/movie/${toggle}`, this.options)),
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    tap(() => this.isLoading.set(false)),
    shareReplay(1),
    catchError(err => this.handleError(err))
  );

  // Converted Signals
  trendingMovies = toSignal(this.trendingMovies$, { initialValue: [] as Movie[] });
  popularMovies = toSignal(this.popularMovies$, { initialValue: [] as Movie[] });
  searchResults = toSignal(this.searchResults$, { initialValue: [] as Movie[] });
  selectedMovie = toSignal(this.movieSelected$, { initialValue: {} as Movie });

  // Methods
  public movieSelected(id: number) {
    this.selectedMovieId.set(id);
  }

  public searchTermFilled(searchTerm: string | null | undefined) {
    this.searchTerm.set(searchTerm);
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred:', error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.message}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError(() => errorMessage);
  }
}
