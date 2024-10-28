import { Component, computed, inject, Input, Signal } from '@angular/core';
import { MovieService } from '../../shared/services/movie/movie.service';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeviceService } from '../../shared/services/device/device.service';
import { LoadingState, Movie } from '../../shared/interfaces/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, NgIf, DatePipe, CurrencyPipe, DecimalPipe, MatProgressSpinnerModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('1500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('1500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MovieDetailsComponent {

  movieService = inject(MovieService);
  deviceService = inject(DeviceService);
  movie = computed<LoadingState<Movie>>(() => this.movieService.selectedMovie());
  votingAverage = computed<number>(() => (this.movie()?.data?.vote_average ?? 0) * 10);
  isMobile = this.deviceService.isMobileSignal;

  @Input()
  set id(movieId: number) {
    this.movieService.movieSelected(movieId);
  }

}
