import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   email = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required]);
   showSpinner: boolean;
   errorMessage: string;

   constructor(private authService: AuthService) { }

   ngOnInit() {
      this.showSpinner = false;
   }

   login() {
      this.showSpinner = true;
      var that = this;
      let credentials = {
         email: this.email.value,
         password: this.password.value
      };

      this.authService.login(credentials)
         .subscribe(function (res) {
            that.showSpinner = false;
            if (res.token) {
               localStorage.setItem('token', res.token);
               localStorage.setItem('email', res.email);
               that.authService.broadCastLoggedInEvent();
            }
         }, function (err) {
            that.showSpinner = false;
            if (err.error && err.error.message) {
               that.errorMessage = err.error.message;
            }
            else {
               console.error(err);
               that.errorMessage = "Unknown error ocurred!";
            }
         });
   }
}
