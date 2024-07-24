import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, observeOn, shareReplay, takeUntil, tap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Movie, MovieResponse } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDA5YzY0M2UzNzVkOTE3ZGMxNWQ3OWMxYWI0OWNhNCIsInN1YiI6IjY1YTgxZGQ0MWJmODc2MDEyM2M5YzY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqN1Xviii_ZwRZFvts-oS7fI5jQV61zpsXI46Y6Mcl0'
    }
  };

  private apiUrl: string = 'https://api.themoviedb.org/3/';

  http = inject(HttpClient);

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
    shareReplay(1),
  );

  private popularMovies$ = this.http.get<MovieResponse>(`${this.apiUrl}movie/popular`, this.options).pipe(
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    shareReplay(1),
  );

  private popularMoviesInTheaters$ = this.http.get<MovieResponse>(`${this.apiUrl}movie/now_playing`, this.options).pipe(
    map((data) =>
      data.results.map((movie: Movie) => ({
        ...movie
      }))
    ),
    shareReplay(1),
  );

  trendingMoviesToday = toSignal(this.trendingMoviesToday$, { initialValue: [] as Movie[] });
  trendingMoviesThisWeek = toSignal(this.trendingMoviesThisWeek$, { initialValue: [] as Movie[] });
  popularMovies = toSignal(this.popularMovies$, { initialValue: [] as Movie[] });
  popularMoviesInTheaters = toSignal(this.popularMoviesInTheaters$, { initialValue: [] as Movie[] });

  fetchMovies(time_window: string) {
    return this.http.get(`${this.apiUrl}trending/movie/${time_window}`, this.options);
  }

  fetchSingleMovie(id: any): any {
    return this.http.get(`${this.apiUrl}movie/${id}?language=en-US`, this.options);
  }

  searchMovies(query: any) {
    return this.http.get(`${this.apiUrl}search/movie?query=${query}`, this.options);
  }

}
