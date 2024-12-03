import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, filter, map, Observable, shareReplay, startWith, switchMap, throwError } from 'rxjs';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingState, Movie, MovieResponse } from '../../interfaces/movie';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDataClient {

  private http = inject(HttpClient);

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

  public searchResults$ = toObservable(this.searchTerm).pipe(
    filter(Boolean),
    switchMap(searchTerm => this.http.get<MovieResponse>(`${this.apiUrl}search/movie?query=${searchTerm}`, this.options)),
    map(data => {
      const movies = data.results.map((movie: Movie) => ({
        ...movie
      }))
      return ({ data: movies, loading: false });
    }
    ),
    shareReplay(1),
    catchError(err => this.handleError(err)),
    startWith({ loading: true }),
    takeUntilDestroyed()
  );

  private movieSelected$ = toObservable(this.selectedMovieId).pipe(
    filter(Boolean),
    switchMap(movieId => this.http.get<Movie>(`${this.apiUrl}movie/${movieId}`, this.options).pipe(
      map((data) => ({ data, loading: false }))
    )),
    shareReplay(1),
    catchError(err => this.handleError(err)),
    startWith({ loading: true }),
    takeUntilDestroyed()
  )

  private trendingMovies$ = toObservable(this.trendingMovieToggle).pipe(
    filter(Boolean),
    switchMap(toggle => this.http.get<MovieResponse>(`${this.apiUrl}trending/movie/${toggle}`, this.options)),
    map(data => {
      const movies = data.results.map((movie: Movie) => ({
        ...movie
      }))
      return ({ data: movies, loading: false });
    }
    ),
    shareReplay(1),
    catchError(err => this.handleError(err)),
    startWith({ loading: true }),
    takeUntilDestroyed()
  )

  public popularMovies$ = toObservable(this.popularMovieToggle).pipe(
    filter(Boolean),
    switchMap(toggle => this.http.get<MovieResponse>(`${this.apiUrl}movie/${toggle}`, this.options)),
    map((data) => {
      const movies = data.results.map((movie: Movie) => ({
        ...movie
      }))
      return ({ data: movies, loading: false });
    }
    ),
    shareReplay(1),
    catchError(err => this.handleError(err)),
    startWith({ loading: true }),
    takeUntilDestroyed()
  );

  // Converted Signals
  trendingMovies = toSignal(this.trendingMovies$, { initialValue: {} as LoadingState<Movie[]> });
  popularMovies = toSignal(this.popularMovies$, { initialValue: {} as LoadingState<Movie[]> });
  searchResults = toSignal(this.searchResults$, { initialValue: {} as LoadingState<Movie[]> });
  selectedMovie = toSignal(this.movieSelected$, { initialValue: {} as LoadingState<Movie> });

  // Methods
  public movieSelected(id: number): void {
    this.selectedMovieId.set(id);
  }

  public searchTermFilled(searchTerm: string | null | undefined): void {
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
