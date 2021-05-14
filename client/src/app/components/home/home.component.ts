import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Globals } from '../../services/globals.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   constructor(private auth: AuthService, private globals: Globals) { }

   isLoggedOut() {
      return !this.auth.isLoggedIn();
   }
}
