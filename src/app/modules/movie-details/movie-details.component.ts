import { Component, computed, inject, Input, Signal } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, NgIf, DatePipe, CurrencyPipe, DecimalPipe, MatProgressSpinnerModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
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
