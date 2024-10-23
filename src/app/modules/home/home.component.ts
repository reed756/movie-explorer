import { Component, computed, inject, signal } from '@angular/core';
import { MovieListComponent } from '../../shared/components/movie-list/movie-list.component';
import { MovieService } from '../../shared/services/movie/movie.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MovieListConfig } from '../../shared/interfaces/movie';
import { TrendingMovieListComponent } from './components/trending-movie-list/trending-movie-list.component';
import { PopularMovieListComponent } from './components/popular-movie-list/popular-movie-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieListComponent, SearchBarComponent, TrendingMovieListComponent, PopularMovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private movieService = inject(MovieService);

  private trendingMovieListConfig: MovieListConfig = {
    heading: 'Trending',
    toggles: [
      { name: 'Today', value: 'day' },
      { name: 'This Week', value: 'week' }
    ]
  }
  private popularMovieListConfig: MovieListConfig = {
    heading: "What's Popular",
    toggles: [
      { name: 'In Theaters', value: 'now_playing' },
      { name: 'For Rent', value: 'popular' },
      { name: 'Top Rated', value: 'top_rated' },
      { name: 'Upcoming', value: 'upcoming' }
    ]
  }

  trendingMovieConfigSignal = signal(this.trendingMovieListConfig);
  popularMovieConfigSignal = signal(this.popularMovieListConfig);

  protected trendingToggle = this.movieService.trendingMovieToggle;
  protected popularToggle = this.movieService.popularMovieToggle;

  trendingMovies = this.movieService.trendingMovies;
  popularMovies = this.movieService.popularMovies;
}
