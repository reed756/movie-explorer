import { Component, Input } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, NgIf, DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {

  movie$ = new BehaviorSubject<any>({});

  constructor(private movieService: MovieService) {
  }

  @Input()
  set id(movieId: string) {
    this.movie$ = this.movieService.fetchSingleMovie(movieId);
  }

}
