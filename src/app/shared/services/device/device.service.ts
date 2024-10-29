import { inject, Injectable, signal } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private deviceService = inject(DeviceDetectorService);

  isMobileSignal = signal<boolean>(false);
  isTabletSignal = signal<boolean>(false);
  isDesktopSignal = signal<boolean>(false);

  constructor() {
    this.setSignals();
  }

  setSignals(): void {
    this.isMobileSignal.set(this.deviceService.isMobile());
    this.isTabletSignal.set(this.deviceService.isTablet());
    this.isDesktopSignal.set(this.deviceService.isDesktop());
  }

}
