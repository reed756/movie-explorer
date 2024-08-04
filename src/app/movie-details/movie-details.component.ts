import { Component, inject, Input } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, NgIf, DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {

  movieService = inject(MovieService);
  movie = this.movieService.selectedMovie;

  @Input()
  set id(movieId: number) {
    this.movieService.movieSelected(movieId);
  }

}
