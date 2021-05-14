import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService, Profile } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { User } from '../../models/user.model';

/*********************/
/* Users Edit dialog */
/*********************/
@Component({
   selector: 'app-users-edit-dialog',
   templateUrl: './users-edit-dialog.component.html'
})
export class UsersComponentEditDialog {
   public profiles: Profile[];
   public user: User;

   constructor(@Inject(MAT_DIALOG_DATA) data, private ds: DataService, private utils: UtilsService, private dialogRef: MatDialogRef<UsersComponentEditDialog>) {
      this.profiles = utils.deepClone(data.profiles);
      this.user = utils.deepClone(data.user);
   }

   cancel() {
      this.dialogRef.close();
   }

   save() {
      var that = this;
      //do some validation
      //tbd
      this.ds.updateUser(this.user).subscribe(function () {
         that.dialogRef.close(true);
      }, function (response) {
         var error = (response.error.error != null) ? response.error.error : response.statusText;
         that.utils.showSnackBar('Error: ' + error, 6000);
      });
   }
}
