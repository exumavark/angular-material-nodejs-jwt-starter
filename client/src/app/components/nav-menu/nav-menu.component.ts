import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Globals } from '../../services/globals.service';

@Component({
   selector: 'app-nav-menu',
   templateUrl: './nav-menu.component.html',
   styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
   isExpanded = false;
   public navItems = [{ title: "Home", link: "/home" }];

   constructor(private ds: DataService, private auth: AuthService, private globals: Globals) {
   }

   ngAfterViewInit(): void {
      this.auth.loggedInEvent.subscribe(() => { this.onLoggedInEvent(); });
   }

   onLoggedInEvent() {
      var that = this;
      that.navItems = [];
      this.ds.getCurrentUser().subscribe(function (user: User) {
         that.navItems.push({ title: "Home", link: "/home" });
         that.navItems.push({ title: "Page 1", link: "/page1" });
         that.navItems.push({ title: "Page 2", link: "/page2" });
         if (user.profileId == 2/*Administrator*/) {
            that.navItems.push({ title: "Users", link: "/users" });
         }
         that.globals.openSideNav();
      });
   }
}
