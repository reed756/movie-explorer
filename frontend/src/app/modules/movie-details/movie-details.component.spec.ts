import { TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieDataClient } from '../../shared/services/movie/movie.service';

describe('MovieDetailsComponent', () => {
  it('should create the component', () => {
    TestBed.configureTestingModule({ imports: [MovieDetailsComponent], providers: [MovieDataClient, provideHttpClient(), provideHttpClientTesting()] });
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
