import { Component, inject, Input, signal } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie, MovieResponse } from '../services/movie';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  private movieService = inject(MovieService);
  searchResults = signal([] as Movie[]);

  @Input()
  set id(searchTerm: string) {
    this.movieService.fetchSearchResults(searchTerm).subscribe((searchRes) => {
      this.searchResults.set(searchRes);
    })
  }

}
