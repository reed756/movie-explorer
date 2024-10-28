import { Component, computed, inject, signal } from '@angular/core';
import { MovieListComponent } from '../../../../shared/components/movie-list/movie-list.component';
import { MovieService } from '../../../../shared/services/movie/movie.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { DeviceService } from '../../../../shared/services/device/device.service';
import { NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingState, Movie } from '../../../../shared/interfaces/movie';

@Component({
  selector: 'app-trending-movie-list',
  standalone: true,
  imports: [MovieListComponent, MatSelectModule, MatButtonToggleModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './trending-movie-list.component.html',
  styleUrl: './trending-movie-list.component.scss'
})
export class TrendingMovieListComponent {

  private movieService = inject(MovieService);
  public deviceService = inject(DeviceService);

  trendingMovies = computed<LoadingState<Movie[]>>(() => this.movieService.trendingMovies());

  public trendingMovieListConfig: any = signal({
    toggles: [
      { name: 'Today', value: 'day' },
      { name: 'This Week', value: 'week' }
    ],
    selectedToggle: 'day'
  })

  isMobile = this.deviceService.isMobileSignal;

  changeToggle(ev?: MatButtonToggleChange | MatSelectChange): void {
    this.trendingMovieListConfig.update((value: any) => ({ ...value, selectedToggle: ev?.value }));
    this.movieService.trendingMovieToggle.set(ev?.value);
  }
}
