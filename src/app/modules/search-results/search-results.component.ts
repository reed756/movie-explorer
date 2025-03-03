import { ChangeDetectionStrategy, Component, computed, inject, Input, ResourceRef } from '@angular/core';
import { MovieDataClient } from '../../shared/services/movie/movie.service';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { deviceDataClient } from '../../shared/services/device/device.service';

@Component({
  selector: 'app-search-results',
  imports: [MatCardModule, MatButtonModule, DatePipe, RouterLink, MatProgressSpinnerModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
  private movieDataClient = inject(MovieDataClient);
  private deviceDataClient = inject(deviceDataClient);

  protected searchResults = computed<ResourceRef<any>>(() => this.movieDataClient.searchResults);
  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal);

  @Input()
  set searchTerm(searchString: string) {
    this.movieDataClient.searchTermFilled(searchString);
  }
}
