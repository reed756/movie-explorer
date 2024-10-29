import { Component, computed, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DeviceService } from '../../services/device/device.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, FormsModule, RouterLink, MatIconModule, NgClass],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private router = inject(Router);
  private deviceService = inject(DeviceService);

  isMobile = computed<boolean>(() => this.deviceService.isMobileSignal());

  searchForm = new FormGroup({
    searchTerm: new FormControl<string | null | undefined>('', [Validators.required, Validators.minLength(1)])
  })

  search(): void {
    this.router.navigate(['search-results', this.searchForm.value.searchTerm]);
  }
}
