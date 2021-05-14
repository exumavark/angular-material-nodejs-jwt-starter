import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { UsersComponentDeleteDialog } from './users-delete-dialog.component';
import { UsersComponentEditDialog } from './users-edit-dialog.component';
import { User } from '../../models/user.model';

@Component({
   selector: 'app-users',
   templateUrl: './users.component.html',
   styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
   displayedColumns: string[] = ['idNo', 'firstname', 'lastname', 'profileId', 'contactNo', 'email', 'notes', 'actions'];
   dataSource = new MatTableDataSource<User>([]);
   filter = "";

   constructor(public ds: DataService, public utils: UtilsService, public addDialog: MatDialog, public editDialog: MatDialog, public deleteDialog: MatDialog) { }

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadUsers();
   }

   applyFilter() {
      this.dataSource.filter = this.filter;
   }

   loadUsers() {
      var that = this;
      this.ds.getUsers().subscribe(function (data: User[]) {
         //add text fields for the filter
         for (var u = 0; u < data.length; ++u) {
            data[u]["profileText"] = that.ds.profileText(data[u].profileId);
         }
         that.dataSource.data = data;
      });
   }

   editRow(user: User) {
      var that = this;
      var firstname = user.firstname;
      const dialogRef = this.deleteDialog.open(UsersComponentEditDialog, {
         data:
         {
            user: user,
            profiles: this.ds.profiles
         }
      });
      dialogRef.afterClosed().subscribe(result => {
         if (result != null) {
            if (result == true) {
               that.loadUsers();
               that.utils.showSnackBar(firstname + ' was updated succesfully', 2500);
            }
         }
      });
   }

   deleteRow(user: User) {
      var that = this;
      var firstname = user.firstname;
      const dialogRef = this.deleteDialog.open(UsersComponentDeleteDialog, { data: { user: user } });
      dialogRef.afterClosed().subscribe(result => {
         if (result == true) {
            this.ds.deleteUser(user.userId).subscribe(function () {
               that.loadUsers();
               that.utils.showSnackBar(firstname + ' was deleted succesfully', 2500);
            }, function (response) {
               var error = (response.error.error != null) ? response.error.error : response.statusText;
               that.utils.showSnackBar('Error: ' + error, 6000);
            });
         }
      });
   }
}
