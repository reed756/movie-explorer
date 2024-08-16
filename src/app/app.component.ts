import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MovieService } from './shared/services/movie.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MovieService]
})
export class AppComponent {

  movieService = inject(MovieService);
  isLoading = this.movieService.isLoading;

  title = 'movie-explorer';
}
