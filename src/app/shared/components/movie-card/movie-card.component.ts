import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { CurrencyPipe, DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, DecimalPipe, DatePipe, NgOptimizedImage],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('1500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('1500ms', style({ opacity: 0 }))]),
    ]),
  ],
  providers: [DecimalPipe]
})
export class MovieCardComponent {
  decimalPipe = inject(DecimalPipe);

  movie = input.required<Movie>();

  averageVote = computed(() => {
    if (this.movie().vote_average === 0) {
      return 'NR'
    } else {
      return `${this.decimalPipe.transform(this.movie().vote_average * 10, '1.0-0')}%`;
    }
  })
}
