import { AuthService } from './services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Globals } from './services/globals.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {
   title = 'starter1';

   mobileQuery: MediaQueryList;

   private _mobileQueryListener: () => void;

   @ViewChild('snav')
   private snav: MatSidenav;

   constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService, private ds: DataService, private globals: Globals) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.globals.openSideNavRequestEvent.subscribe(() => { this.snav.open(); });
   }

   ngOnInit() {
   }

   ngAfterViewInit(): void {
      var that = this;
      this.auth.loggedInEvent.subscribe(() => { this.onLoggedInEvent(); });
      this.auth.loggedOutEvent.subscribe(() => { this.onLoggedOutEvent(); });
      if (this.isLoggedIn()) {
         this.ds.getCurrentUser().subscribe(() => {
            that.auth.broadCastLoggedInEvent();
            //not much else to do, only wanted to make the call to ensure
            //the token is still valid and get the user logged out if not
         });
      }
   }

   onLoggedInEvent() {
      this.router.navigate(['home']);
   }

   onLoggedOutEvent() {
      this.snav.close();
   }

   email() {
      if (this.auth.isLoggedIn()) {
         return localStorage.getItem("email");
      }
      return "";
   }

   isLoggedIn() {
      return this.auth.isLoggedIn();
   }

   logout() {
      this.auth.logout();
      this.router.navigate(['login']);
   }

   ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
   }
}
