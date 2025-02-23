import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeToWatchListComponent } from './free-to-watch-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieDataClient } from '../../../shared/services/movie/movie.service';

describe('FreeToWatchListComponent', () => {
  let component: FreeToWatchListComponent;
  let fixture: ComponentFixture<FreeToWatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeToWatchListComponent],
      providers: [MovieDataClient, provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FreeToWatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
