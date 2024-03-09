import { Component, Input } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  constructor(private movieService: MovieService) {}

  @Input()
  set id(searchTerm: string) {
    this.movieService.searchMovies(searchTerm).subscribe(res => console.log(res));
  }

}
