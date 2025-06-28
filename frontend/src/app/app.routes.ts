import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home` page
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then(it => it.HomeComponent)
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./modules/auth/auth.component').then(it => it.AuthComponent)
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
      import('./modules/page-not-found/page-not-found.component').then(it => it.PageNotFoundComponent)
  },  // Wildcard route for a 404 page
];
