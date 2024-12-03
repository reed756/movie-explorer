import { Component, Input, input, TemplateRef } from '@angular/core';
import { MovieDataClient } from '../../services/movie/movie.service';
import { NgForOf, NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-movie-list',
  imports: [NgForOf, FormsModule, MovieCardComponent, NgTemplateOutlet, MatProgressSpinnerModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieDataClient, HttpClient]
})
export class MovieListComponent {
  readonly data = input<any>();
  @Input() listTemplate!: TemplateRef<any>;
}
