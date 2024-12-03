import { Component, computed, inject, Input } from '@angular/core';
import { MovieDataClient } from '../../shared/services/movie/movie.service';
import { NgForOf, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { deviceDataClient } from '../../shared/services/device/device.service';
import { LoadingState, Movie } from '../../shared/interfaces/movie';

@Component({
  selector: 'app-search-results',
  imports: [MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, MatProgressSpinnerModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  private movieDataClient = inject(MovieDataClient);
  private deviceDataClient = inject(deviceDataClient);

  protected searchResults = computed<LoadingState<Movie[]>>(() => this.movieDataClient.searchResults());
  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal);

  @Input()
  set searchTerm(searchString: string) {
    this.movieDataClient.searchTermFilled(searchString);
  }
}
