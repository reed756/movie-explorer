import { TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { HttpHandler } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MovieListComponent', () => {

  it('should create the component', () => {
    TestBed.configureTestingModule({ imports: [MovieListComponent], providers: [HttpHandler, provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(MovieListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

});
