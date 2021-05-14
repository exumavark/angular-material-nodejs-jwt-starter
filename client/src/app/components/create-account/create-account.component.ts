import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
   selector: 'app-create-account',
   templateUrl: './create-account.component.html',
   styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
   idNo = new FormControl('', []);
   firstname = new FormControl('', [Validators.required]);
   lastname = new FormControl('', [Validators.required]);
   contactNo = new FormControl('', []);
   email = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required]);
   confirmPassword = new FormControl('', [Validators.required]);
   showSpinner: boolean;
   errorMessage: string;

   constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(): void {
   }

   create(): void {
      this.showSpinner = true;
      var that = this;
      let newUser = {
         idNo: this.idNo.value,
         firstname: this.firstname.value,
         lastname: this.lastname.value,
         contactNo: this.contactNo.value,
         email: this.email.value,
         password: this.password.value,
         confirmPassword: this.confirmPassword.value,
         registrationOrigin: window.location.origin
      };

      this.authService.register(newUser)
         .subscribe(function (res) {
            that.showSpinner = false;
            that.router.navigate(['create-account-completed']);
         }, function (err) {
            that.showSpinner = false;
            if (err.error && err.error.message) {
               that.errorMessage = err.error.message;
            }
            else if (err.error) {
               that.errorMessage = err.error;
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
