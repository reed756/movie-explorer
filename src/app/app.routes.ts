import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home` page
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then(it => it.HomeComponent)
  },
  {
    path: 'movie-details/:id',
    loadComponent: () =>
      import('./modules/movie-details/movie-details.component').then(it => it.MovieDetailsComponent)
  },
  {
    path: 'search-results/:searchTerm',
    loadComponent: () =>
      import('./modules/search-results/search-results.component').then(it => it.SearchResultsComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./modules/movie-details/movie-details.component').then(it => it.MovieDetailsComponent)
  },  // Wildcard route for a 404 page
];
