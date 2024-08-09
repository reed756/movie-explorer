import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home` page
  { path: 'home', component: HomeComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'search-results/:searchTerm', component: SearchResultsComponent },
  { path: '**', component: MovieDetailsComponent },  // Wildcard route for a 404 page
];
