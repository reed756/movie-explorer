import { inject, Injectable, signal } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class deviceDataClient {
  private deviceDataClient = inject(DeviceDetectorService);

  isMobileSignal = signal<boolean>(false);
  isTabletSignal = signal<boolean>(false);
  isDesktopSignal = signal<boolean>(false);

  constructor() {
    this.setSignals();
  }

  private setSignals(): void {
    this.isMobileSignal.set(this.deviceDataClient.isMobile());
    this.isTabletSignal.set(this.deviceDataClient.isTablet());
    this.isDesktopSignal.set(this.deviceDataClient.isDesktop());
  }

}
