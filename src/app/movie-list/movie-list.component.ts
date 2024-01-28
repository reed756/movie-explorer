import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../services/movie.service';
import { NgFor, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieService, HttpClient]
})
export class MovieListComponent implements OnInit {

  movies: any;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.fetchData().subscribe((res: any) => {
      console.log(res);
      this.movies = res.results;
    });
  }

}
