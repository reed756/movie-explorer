import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  movie = input.required<Movie>();
}
