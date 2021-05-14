import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   constructor(private ds: DataService, private snackBar: MatSnackBar) { }

   ngOnInit(): void {
      this.ds.getCurrentUser().subscribe(function (data) {
      });
   }
}
