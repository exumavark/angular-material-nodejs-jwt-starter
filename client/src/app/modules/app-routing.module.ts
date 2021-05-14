import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { AccessGuardService } from '../services/access-guard.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { CreateAccountComponent } from '../components/create-account/create-account.component';
import { CreateAccountCompletedComponent } from '../components/create-account-completed/create-account-completed.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { UsersComponent } from '../components/users/users.component';
import { Page1Component } from '../components/page1/page1.component';
import { Page2Component } from '../components/page2/page2.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'page1', component: Page1Component, data: { requiresLogin: true }, canActivate: [AccessGuardService] },
   { path: 'page2', component: Page2Component, data: { requiresLogin: true }, canActivate: [AccessGuardService] },
   { path: 'users', component: UsersComponent, data: { requiresLogin: true }, canActivate: [AccessGuardService] },
   { path: 'home', component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'create-account', component: CreateAccountComponent },
   { path: 'create-account-completed', component: CreateAccountCompletedComponent },
   { path: 'forgot-password', component: ForgotPasswordComponent },
   { path: 'reset-password', component: ResetPasswordComponent },
   { path: 'profile', component: ProfileComponent, data: { requiresLogin: true }, canActivate: [AccessGuardService] }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
