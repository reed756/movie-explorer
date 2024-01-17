import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MovieService]
})
export class AppComponent implements OnInit {

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.fetchData().subscribe((res) => {
      console.log(res);
    });
  }

  title = 'movie-explorer';
}
