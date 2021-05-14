import { AngularSplitModule } from 'angular-split';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { HomeComponent } from '../components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { LoginComponent } from '../components/login/login.component';
import { Page1Component } from '../components/page1/page1.component';
import { Page2Component } from '../components/page2/page2.component';
import { UsersComponent } from '../components/users/users.component';
import { UsersComponentDeleteDialog } from '../components/users/users-delete-dialog.component';
import { UsersComponentEditDialog } from '../components/users/users-edit-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileComponent } from '../components/profile/profile.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { CreateAccountComponent } from '../components/create-account/create-account.component';
import { CreateAccountCompletedComponent } from '../components/create-account-completed/create-account-completed.component';
import { Globals } from '../services/globals.service';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      LoginComponent,
      Page1Component,
      Page2Component,
      UsersComponent,
      UsersComponentDeleteDialog,
      UsersComponentEditDialog,
      ProfileComponent,
      ForgotPasswordComponent,
      CreateAccountComponent,
      CreateAccountCompletedComponent,
      ResetPasswordComponent
   ],
   imports: [
      AngularSplitModule.forRoot(),
      BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatDatepickerModule,
      MatDialogModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule
   ],
   providers: [
      Globals,
      MatDatepickerModule,
      { provide: MAT_DATE_LOCALE, useValue: 'en-ZA' },
      { provide: LOCALE_ID, useValue: 'en-ZA' },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
   ],
   entryComponents: [
      MatSpinner
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
