import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UtilsService } from '../../services/utils.service';
import { User } from '../../models/user.model';

/***********************/
/* Users Delete dialog */
/***********************/
@Component({
   selector: 'app-users-delete-dialog',
   templateUrl: './users-delete-dialog.component.html'
})
export class UsersComponentDeleteDialog {
   public user: User;
   constructor(@Inject(MAT_DIALOG_DATA) data, utils: UtilsService) {
      this.user = utils.deepClone(data.user);
   }
}
