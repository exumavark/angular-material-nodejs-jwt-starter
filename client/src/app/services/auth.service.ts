import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   @Output() loggedInEvent = new EventEmitter();
   @Output() loggedOutEvent = new EventEmitter();

   apiUrl = environment.apiRootUrl + '/api/auth/';

   constructor(private http: HttpClient) { }

   login(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'login', data);
   }

   register(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'register', data);
   }

   sendPasswordResetEmail(email: string, passwordResetOrigin: string): Observable<any> {
      let data = { email: email, passwordResetOrigin: passwordResetOrigin };
      return this.http.post<any>(this.apiUrl + 'sendpasswordresetemail', data);
   }

   broadCastLoggedInEvent() {
      this.loggedInEvent.emit();
   }

   logout() {
      localStorage.removeItem('email');
      localStorage.removeItem('firstName');
      localStorage.removeItem('token');
      this.loggedOutEvent.emit();
   }

   isLoggedIn() {
      var token = localStorage.getItem('token');
      if (token) {
         return true;
      }
      return false;
   }
}
