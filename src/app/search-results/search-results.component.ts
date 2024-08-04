import { Component, computed, effect, inject, Input, OnInit, signal } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { NgForOf, DatePipe, NgIf, DecimalPipe, AsyncPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, NgIf, DecimalPipe, MatButtonToggleModule, FormsModule, SearchBarComponent, NgStyle],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  private movieService = inject(MovieService);

  searchResults = computed(() => this.movieService.searchResults());

  @Input()
  set searchTerm(searchString: string) {
    this.movieService.searchTermFilled(searchString);
  }
}
