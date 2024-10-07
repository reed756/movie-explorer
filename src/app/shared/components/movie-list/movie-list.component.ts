import { Component, computed, inject, input, model, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../services/movie/movie.service';
import { DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie, MovieListConfig } from '../../interfaces/movie';
import { DeviceService } from '../../services/device/device.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgForOf, MatButtonModule, DatePipe, RouterLink, NgIf, DecimalPipe, MatButtonToggleModule, FormsModule, SearchBarComponent, MovieCardComponent, NgClass, MatSelectModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieService, HttpClient]
})
export class MovieListComponent {
  toggle = model();
  movies = input.required<Movie[]>();
  config = input.required<MovieListConfig>();
  deviceService = inject(DeviceService);

  isMobile = this.deviceService.isMobileSignal;

  changeToggle(ev?: MatButtonToggleChange | MatSelectChange) {
    this.toggle.set(ev?.value);
  }
}
