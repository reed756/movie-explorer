import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
