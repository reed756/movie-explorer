import { Component, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../services/movie.service';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, NgIf, DecimalPipe, MatButtonToggleModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieService, HttpClient]
})
export class MovieListComponent implements OnInit {

  movies: any = signal([]);
  trendingTimeWindow = 'day';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.fetchMovies(this.trendingTimeWindow).subscribe((res: any) => {
      console.log(res);
      this.movies.set(res.results);
    });
  }

}
