import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
   email = new FormControl('', [Validators.required, Validators.email]);
   showSpinner: boolean;
   errorMessage: string;
   emailSent: boolean;

   constructor(private ds: DataService, private auth: AuthService) {
      this.emailSent = false;
   }

   ngOnInit() {
      this.showSpinner = false;
   }

   reset() {
      this.showSpinner = true;
      var that = this;
      this.auth.sendPasswordResetEmail(this.email.value, window.location.origin)
         .subscribe(function (res) {
            alert(1);
            that.showSpinner = false;
            that.emailSent = true;
         }, function (err) {
            alert(2);
            that.showSpinner = false;
            if (err.error && err.error.title) {
               that.errorMessage = err.error.title;
            }
            else {
               that.errorMessage = err.statusText;
            }
            console.log("*** ERROR BEGIN ***");
            console.log(err);
            console.log("*** ERROR END ***");
         });
   }
}
