import { TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { HttpHandler } from '@angular/common/http';

describe('MovieListComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [MovieListComponent], providers: [HttpHandler] });
    const fixture = TestBed.createComponent(MovieListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
