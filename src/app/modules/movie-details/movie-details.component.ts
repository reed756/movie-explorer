import { Component, computed, inject, Input, Signal } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, NgIf, DatePipe, CurrencyPipe, DecimalPipe, MatProgressSpinnerModule],
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
  movie = this.movieService.selectedMovie;
  isLoading = this.movieService.isLoading;
  votingAverage = computed(() => this.movie().vote_average * 10);

  @Input()
  set id(movieId: number) {
    this.movieService.movieSelected(movieId);
  }

}
