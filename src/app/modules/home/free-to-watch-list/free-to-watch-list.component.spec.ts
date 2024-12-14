import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeToWatchListComponent } from './free-to-watch-list.component';

describe('FreeToWatchListComponent', () => {
  let component: FreeToWatchListComponent;
  let fixture: ComponentFixture<FreeToWatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeToWatchListComponent]
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
