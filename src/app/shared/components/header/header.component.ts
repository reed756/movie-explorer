import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, SearchBarComponent, RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showSearchBar = false;

}
