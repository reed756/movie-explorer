import { Injectable, isDevMode, resource, signal } from '@angular/core';
import environment from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDataClient {

  private options = {
    headers: {
      accept: 'application/json',
      authorization: isDevMode() ? '' : environment.PROD_API_KEY,
    },
  };

  private apiUrl: string | undefined = isDevMode() ? environment.DEV_URL : environment.PROD_URL;
  searchTerm = signal<string | null | undefined>('');
  selectedMovieId = signal<number | undefined>(0);
  trendingMovieToggle = signal<string | undefined>('day');
  popularMovieToggle = signal<string | undefined>('now_playing');
  freeToWatchToggle = signal<string | undefined>('movie');

  public searchResults = resource({
    params: () => ({ searchTerm: this.searchTerm() }),
    loader: async ({ params }) => {
      if (!params.searchTerm) {
        return [];
      }
      const response = await fetch(`${this.apiUrl}/search/${params.searchTerm}`, this.options);
      return response.json();
    }
  })

  public movieSelected = resource({
    params: () => ({ movieId: this.selectedMovieId() }),
    loader: async ({ params }) => {
      const response = await fetch(`${this.apiUrl}/movie/${params.movieId}`, this.options);
      return response.json();
    }
  })

  public trendingMovies = resource({
    params: () => ({ toggleValue: this.trendingMovieToggle() }),
    loader: async ({ params }) => {
      const response = await fetch(`${this.apiUrl}/trending/${params.toggleValue}`, this.options);
      return response.json();
    }
  })

  public popularMovies = resource({
    params: () => ({ toggleValue: this.popularMovieToggle() }),
    loader: async ({ params }) => {
      const response = await fetch(`${this.apiUrl}/popular/${params.toggleValue}`, this.options);
      return response.json();
    }
  })

  public freeToWatch = resource({
    params: () => ({ toggleValue: this.freeToWatchToggle() }),
    loader: async ({ params }) => {
      const response = await fetch(`${this.apiUrl}/free/${params.toggleValue}`, this.options);
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
