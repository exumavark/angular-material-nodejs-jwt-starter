import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

export interface Profile {
   profileId: number;
   profile: string;
}

@Injectable({
   providedIn: 'root'
})
export class DataService {
   public profiles: Profile[];

   constructor(private http: HttpClient) {
      //initialise profiles
      this.profiles = [];
      this.profiles.push({ profileId: 1, profile: "Basic" });
      this.profiles.push({ profileId: 2, profile: "Administrator" });
   }

   deleteUser(userId) {
      return this.http.delete(environment.apiRootUrl + '/api/user/deleteuser?userId=' + userId);
   }

   getCurrentUser() {
      return this.http.get(environment.apiRootUrl + '/api/user/getcurrentuser');
   }

   getUsers() {
      return this.http.get(environment.apiRootUrl + '/api/user/getusers');
   }

   profileText(profileId: number) {
      for (var i = 0; i < this.profiles.length; ++i) {
         if (this.profiles[i].profileId == profileId) {
            return this.profiles[i].profile;
         }
      }
      return "";
   }

   resetPassword(password, token) {
      return this.http.post(environment.apiRootUrl + '/api/user/resetpassword', { password: password, token: token });
   }

   updateUser(user: User) {
      return this.http.put(environment.apiRootUrl + '/api/user/updateuser', user);
   }
}
