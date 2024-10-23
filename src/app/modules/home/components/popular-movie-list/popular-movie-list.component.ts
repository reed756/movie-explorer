import { Component, inject, signal } from '@angular/core';
import { MovieListComponent } from '../../../../shared/components/movie-list/movie-list.component';
import { MovieService } from '../../../../shared/services/movie/movie.service';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DeviceService } from '../../../../shared/services/device/device.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-popular-movie-list',
  standalone: true,
  imports: [MovieListComponent, MatSelectModule, MatButtonToggleModule, NgClass],
  templateUrl: './popular-movie-list.component.html',
  styleUrl: './popular-movie-list.component.scss'
})
export class PopularMovieListComponent {

  private movieService = inject(MovieService);
  public deviceService = inject(DeviceService);

  popularMovies = this.movieService.popularMovies;

  public popularMovieListConfig: any = signal({
    toggles: [
      { name: 'In Theaters', value: 'now_playing' },
      { name: 'For Rent', value: 'popular' },
      { name: 'Top Rated', value: 'top_rated' },
      { name: 'Upcoming', value: 'upcoming' }
    ],
    selectedToggle: 'now_playing'
  })

  isMobile = this.deviceService.isMobileSignal;

  changeToggle(ev?: MatButtonToggleChange | MatSelectChange) {
    console.log(ev);
    this.popularMovieListConfig.update((value: any) => ({ ...value, selectedToggle: ev?.value }));
    this.movieService.popularMovieToggle.set(ev?.value);
    console.log(this.popularMovieListConfig());
    console.log(this.movieService.popularMovieToggle());
  }
}
