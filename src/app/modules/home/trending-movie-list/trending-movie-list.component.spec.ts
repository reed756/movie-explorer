import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMovieListComponent } from './trending-movie-list.component';

describe('TrendingMovieListComponent', () => {
  let component: TrendingMovieListComponent;
  let fixture: ComponentFixture<TrendingMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingMovieListComponent]
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
