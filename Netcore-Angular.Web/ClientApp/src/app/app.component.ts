import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Net core 2.2 + Angular 7.1 Starter';
  mobileQuery: MediaQueryList;
  // Sidemenu
  @ViewChild('snav') sidenav: MatSidenav;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private auth: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout() {
    this.sidenav.opened = false;
    this.auth.logout();
  }
}



