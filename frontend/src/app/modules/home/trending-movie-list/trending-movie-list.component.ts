import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MovieListComponent } from '../../../shared/components/movie-list/movie-list.component';
import { MovieDataClient } from '../../../shared/services/movie/movie.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { deviceDataClient } from '../../../shared/services/device/device.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-trending-movie-list',
  imports: [MovieListComponent, MatSelectModule, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './trending-movie-list.component.html',
  styleUrl: './trending-movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendingMovieListComponent {

  private movieDataClient = inject(MovieDataClient);
  public deviceDataClient = inject(deviceDataClient);

  protected trendingMovies = computed(() => {
    return {
      movieList: this.movieDataClient.trendingMovies.value(),
      config: this.trendingMovieListConfig()
    }
  });

  protected trendingMovieListConfig: any = signal({
    toggles: [
      { name: 'Today', value: 'day' },
      { name: 'This Week', value: 'week' }
    ],
    selectedToggle: 'day'
  })

  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal());

  public changeToggle(ev?: MatButtonToggleChange | MatSelectChange): void {
    this.trendingMovieListConfig.update((value: any) => ({ ...value, selectedToggle: ev?.value }));
    this.movieDataClient.trendingMovieToggle.set(ev?.value);
  }
}
