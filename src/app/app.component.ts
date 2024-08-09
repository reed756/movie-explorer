import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MovieService } from './shared/services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MovieService]
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  title = 'movie-explorer';
}
