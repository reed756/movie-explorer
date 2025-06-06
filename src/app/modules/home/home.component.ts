import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MovieDataClient } from '../../shared/services/movie/movie.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MovieListConfig } from '../../shared/interfaces/movie';
import { TrendingMovieListComponent } from './trending-movie-list/trending-movie-list.component';
import { PopularMovieListComponent } from './popular-movie-list/popular-movie-list.component';
import { FreeToWatchListComponent } from './free-to-watch-list/free-to-watch-list.component';

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent, TrendingMovieListComponent, PopularMovieListComponent, FreeToWatchListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  private movieDataClient = inject(MovieDataClient);

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

  protected trendingMovieConfigSignal = signal(this.trendingMovieListConfig);
  protected popularMovieConfigSignal = signal(this.popularMovieListConfig);

  protected trendingToggle = computed(() => this.movieDataClient.trendingMovieToggle);
  protected popularToggle = computed(() => this.movieDataClient.popularMovieToggle);

  protected trendingMovies = computed(() => this.movieDataClient.trendingMovies);
  protected popularMovies = computed(() => this.movieDataClient.popularMovies);
}
