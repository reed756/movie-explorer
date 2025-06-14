import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMovieListComponent } from './trending-movie-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieDataClient } from '../../../shared/services/movie/movie.service';

describe('TrendingMovieListComponent', () => {
  let component: TrendingMovieListComponent;
  let fixture: ComponentFixture<TrendingMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMovieListComponent],
      providers: [MovieDataClient, provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrendingMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
