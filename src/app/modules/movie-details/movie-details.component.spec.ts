import { TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { HttpHandler } from '@angular/common/http';

describe('MovieDetailsComponent', () => {
  it('should create the component', () => {
    TestBed.configureTestingModule({ imports: [MovieDetailsComponent], providers: [HttpHandler] });
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
