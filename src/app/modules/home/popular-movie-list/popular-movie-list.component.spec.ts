import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMovieListComponent } from './popular-movie-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieDataClient } from '../../../shared/services/movie/movie.service';

describe('PopularMovieListComponent', () => {
  let component: PopularMovieListComponent;
  let fixture: ComponentFixture<PopularMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularMovieListComponent],
      providers: [MovieDataClient, provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopularMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
