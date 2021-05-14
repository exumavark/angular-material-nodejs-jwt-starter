import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
   selector: 'app-reset-password',
   templateUrl: './reset-password.component.html',
   styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
   hasBeenReset: boolean;
   showSpinner: boolean;
   token: string;
   password = new FormControl('', [Validators.required]);
   confirmPassword = new FormControl('', [Validators.required]);
   errorMessage: string;

   constructor(private ds: DataService, private router: Router) {
      this.token = "";
      this.hasBeenReset = false;
   }

   ngOnInit(): void {
      this.showSpinner = false;
      var that = this;
      this.router.routerState.root.queryParams.subscribe(params => {
         if (params['token'] != undefined) {
            that.token = params['token'];
         }
      });
   }

   reset() {
      if (this.validate() == true) {
         var that = this;
         this.showSpinner = true;
         this.ds.resetPassword(this.password.value, this.token).subscribe(function (res) {
            that.showSpinner = false;
            that.hasBeenReset = true;
         }, function (err) {
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

   validate() {
      this.errorMessage = "";
      if (this.password.value != this.confirmPassword.value) {
         this.errorMessage = "Passwords do not match!";
         return false;
      }
      return true;
   }
}
