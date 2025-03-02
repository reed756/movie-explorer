import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MovieListComponent } from '../../../shared/components/movie-list/movie-list.component';
import { MovieDataClient } from '../../../shared/services/movie/movie.service';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { deviceDataClient } from '../../../shared/services/device/device.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-popular-movie-list',
  imports: [MovieListComponent, MatSelectModule, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './popular-movie-list.component.html',
  styleUrl: './popular-movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularMovieListComponent {

  private movieDataClient = inject(MovieDataClient);
  public deviceDataClient = inject(deviceDataClient);

  protected popularMovies = computed(() => {
    return {
      movieList: this.movieDataClient.popularMovies.value(),
      config: this.popularMovieListConfig()
    }
  });

  protected popularMovieListConfig: any = signal({
    toggles: [
      { name: 'In Theaters', value: 'now_playing' },
      { name: 'For Rent', value: 'popular' },
      { name: 'Top Rated', value: 'top_rated' },
      { name: 'Upcoming', value: 'upcoming' }
    ],
    selectedToggle: 'now_playing'
  })

  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal());

  public changeToggle(ev?: MatButtonToggleChange | MatSelectChange): void {
    this.popularMovieListConfig.update((value: any) => ({ ...value, selectedToggle: ev?.value }));
    this.movieDataClient.popularMovieToggle.set(ev?.value);
  }
}
