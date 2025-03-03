import { ChangeDetectionStrategy, Component, computed, inject, Input, ResourceRef } from '@angular/core';
import { MovieDataClient } from '../../shared/services/movie/movie.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import { deviceDataClient } from '../../shared/services/device/device.service';

@Component({
  selector: 'app-movie-details',
  imports: [DatePipe, DecimalPipe, MatProgressSpinnerModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('1500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('1500ms', style({ opacity: 0 }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {

  private movieDataClient = inject(MovieDataClient);
  public deviceDataClient = inject(deviceDataClient);
  protected selectedMovie = computed<ResourceRef<any>>(() => this.movieDataClient.movieSelected);
  protected votingAverage = computed<number>(() => (this.selectedMovie()?.value().vote_average ?? 0) * 10);
  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal());

  @Input()
  set id(movieId: number) {
    this.movieDataClient.selectMovie(movieId);
  }

}
