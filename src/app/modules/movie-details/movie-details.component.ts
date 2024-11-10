import { Component, computed, inject, Input } from '@angular/core';
import { movieDataClient } from '../../shared/services/movie/movie.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import { deviceDataClient } from '../../shared/services/device/device.service';
import { LoadingState, Movie } from '../../shared/interfaces/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe, MatProgressSpinnerModule],
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

  private movieDataClient = inject(movieDataClient);
  public deviceDataClient = inject(deviceDataClient);
  protected selectedMovie = computed<LoadingState<Movie>>(() => this.movieDataClient.selectedMovie());
  protected votingAverage = computed<number>(() => (this.selectedMovie()?.data?.vote_average ?? 0) * 10);
  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal());

  @Input()
  set id(movieId: number) {
    this.movieDataClient.movieSelected(movieId);
  }

}
