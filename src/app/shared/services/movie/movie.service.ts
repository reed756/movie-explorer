import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
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
      Authorization: environment.apiKey,
    },
  };

  private apiUrl: string = 'https://api.themoviedb.org/3/';
  searchTerm = signal<string | null | undefined>(undefined);
  selectedMovieId = signal<number | undefined>(undefined);
  trendingMovieToggle = signal<string | undefined>('day');
  popularMovieToggle = signal<string | undefined>('now_playing');
  freeToWatchToggle = signal<string | undefined>('movie');

  public searchResults$ = toObservable(this.searchTerm).pipe(
    filter(Boolean),
    switchMap(searchTerm => this.http.get<MovieResponse>(`${this.apiUrl}search/movie?query=${searchTerm}`, this.options).pipe(
      map(data => {
        const movies = data.results.map((movie: Movie) => ({
          ...movie
        }))
        return ({ data: movies, loading: false });
      }),
      startWith({ loading: true })
    )),
    shareReplay(1),
    catchError((err: HttpErrorResponse) => this.handleError(err)),
    startWith({ loading: true }),
    takeUntilDestroyed()
  );

  private movieSelected$ = toObservable(this.selectedMovieId).pipe(
    filter(Boolean),
    switchMap(movieId => this.http.get<Movie>(`${this.apiUrl}movie/${movieId}`, this.options).pipe(
      map((data) => ({ data, loading: false })),
      startWith({ loading: true })
    )),
    shareReplay(1),
    catchError((err: HttpErrorResponse) => this.handleError(err)),
    startWith({ loading: true }),
    takeUntilDestroyed()
  )

  public trendingMovies = resource({
    request: () => ({ toggleValue: this.trendingMovieToggle() }),
    loader: async ({ request }) => {
      const response = await fetch(`${this.apiUrl}trending/movie/${request.toggleValue}`, this.options);
      return response.json();
    }
  })

  public popularMovies = resource({
    request: () => ({ toggleValue: this.popularMovieToggle() }),
    loader: async ({ request }) => {
      const response = await fetch(`${this.apiUrl}movie/${request.toggleValue}`, this.options);
      return response.json();
    }
  })

  public freeToWatch = resource({
    request: () => ({ toggleValue: this.freeToWatchToggle() }),
    loader: async ({ request }) => {
      const response = await fetch(`${this.apiUrl}discover/${request.toggleValue}?with_watch_monetization_types=free`, this.options);
      return response.json();
    }
  })

  // Converted Signals
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
