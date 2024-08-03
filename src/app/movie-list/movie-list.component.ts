import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../services/movie.service';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, NgIf, DecimalPipe, MatButtonToggleModule, FormsModule, SearchBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieService, HttpClient]
})
export class MovieListComponent {

  private movieService = inject(MovieService);

  trendingMovies = computed(() =>
    this.trendingTimeWindow() === 'day' ? this.movieService.trendingMoviesToday() : this.movieService.trendingMoviesThisWeek()
  );
  popularMovies = computed(() =>
    this.popularToggle() === 'popular' ? this.movieService.popularMovies() : this.movieService.popularMoviesInTheaters()
  )
  trendingTimeWindow = signal('day');
  popularToggle = signal('popular');

}
