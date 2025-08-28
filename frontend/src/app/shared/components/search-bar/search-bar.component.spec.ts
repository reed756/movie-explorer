import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { HttpHandler } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SearchBarComponent', () => {
  it('should create the component', () => {
    TestBed.configureTestingModule({ imports: [SearchBarComponent], providers: [HttpHandler, provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(SearchBarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
