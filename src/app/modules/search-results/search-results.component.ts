import { Component, computed, inject, Input } from '@angular/core';
import { MovieService } from '../../shared/services/movie/movie.service';
import { NgForOf, DatePipe, NgIf, DecimalPipe, NgStyle, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeviceService } from '../../shared/services/device/device.service';
import { LoadingState, Movie } from '../../shared/interfaces/movie';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, NgIf, DecimalPipe, MatButtonToggleModule, FormsModule, SearchBarComponent, NgStyle, MatProgressSpinnerModule, NgClass],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  private movieService = inject(MovieService);
  private deviceService = inject(DeviceService);

  searchResults = computed<LoadingState<Movie[]>>(() => this.movieService.searchResults());
  isMobile = this.deviceService.isMobileSignal;

  @Input()
  set searchTerm(searchString: string) {
    this.movieService.searchTermFilled(searchString);
  }
}
