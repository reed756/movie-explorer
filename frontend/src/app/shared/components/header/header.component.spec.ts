import { TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  it('should create the component', () => {
    TestBed.configureTestingModule({ imports: [HeaderComponent, RouterModule.forRoot([])], providers: [HttpHandler] });
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
