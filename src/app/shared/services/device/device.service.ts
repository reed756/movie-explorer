import { inject, Injectable, signal } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private deviceService = inject(DeviceDetectorService);

  isMobileSignal = signal(false);
  isTabletSignal = signal(false);
  isDesktopSignal = signal(false);

  constructor() {
    this.setSignals();
  }

  setSignals() {
    this.isMobileSignal.set(this.deviceService.isMobile());
    this.isTabletSignal.set(this.deviceService.isTablet());
    this.isDesktopSignal.set(this.deviceService.isDesktop());
  }

}
