import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MovieListComponent } from '../../../shared/components/movie-list/movie-list.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { deviceDataClient } from '../../../shared/services/device/device.service';
import { MovieDataClient } from '../../../shared/services/movie/movie.service';

@Component({
  selector: 'app-free-to-watch-list',
  imports: [MovieListComponent, MatSelectModule, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './free-to-watch-list.component.html',
  styleUrl: './free-to-watch-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FreeToWatchListComponent {

  private movieDataClient = inject(MovieDataClient);
  public deviceDataClient = inject(deviceDataClient);

  protected isMobile = computed(() => this.deviceDataClient.isMobileSignal());

  protected freeToWatch = computed(() => {
    return {
      movieList: this.movieDataClient.freeToWatch.value(),
      config: this.freeToWatchListConfig()
    }
  });

  protected freeToWatchListConfig: any = signal({
    toggles: [
      { name: 'Movies', value: 'movie' },
      { name: 'TV', value: 'tv' }
    ],
    selectedToggle: 'movie'
  });

  public changeToggle(ev?: MatButtonToggleChange | MatSelectChange): void {
    this.freeToWatchListConfig.update((value: any) => ({ ...value, selectedToggle: ev?.value }));
    this.movieDataClient.freeToWatchToggle.set(ev?.value);
  }

}
