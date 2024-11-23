import { Component, computed, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { deviceDataClient } from '../../services/device/device.service';
@Component({
    selector: 'app-search-bar',
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private router = inject(Router);
  private deviceDataClient = inject(deviceDataClient);

  protected isMobile = computed<boolean>(() => this.deviceDataClient.isMobileSignal());

  protected searchForm = new FormGroup({
    searchTerm: new FormControl<string | null | undefined>('', [Validators.required, Validators.minLength(1)])
  })

  public search(): void {
    this.router.navigate(['search-results', this.searchForm.value.searchTerm]);
  }
}
