import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDataClient {

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

  public searchResults = resource({
    request: () => ({ searchTerm: this.searchTerm() }),
    loader: async ({ request }) => {
      const response = await fetch(`${this.apiUrl}search/movie?query=${request.searchTerm}`, this.options);
      return response.json();
    }
  })

  public movieSelected = resource({
    request: () => ({ movieId: this.selectedMovieId() }),
    loader: async ({ request }) => {
      const response = await fetch(`${this.apiUrl}movie/${request.movieId}`, this.options);
      return response.json();
    }
  })

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

  // Methods
  public selectMovie(id: number): void {
    this.selectedMovieId.set(id);
  }

  public searchTermFilled(searchTerm: string | null | undefined): void {
    this.searchTerm.set(searchTerm);
  }
}
