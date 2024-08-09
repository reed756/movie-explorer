import { Component, computed, inject, Input } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { NgForOf, DatePipe, NgIf, DecimalPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, NgIf, DecimalPipe, MatButtonToggleModule, FormsModule, SearchBarComponent, NgStyle, MatProgressSpinnerModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  private movieService = inject(MovieService);
  searchResults = computed(() => this.movieService.searchResults());
  isLoading = this.movieService.isLoading;

  @Input()
  set searchTerm(searchString: string) {
    this.movieService.searchTermFilled(searchString);
  }
}
