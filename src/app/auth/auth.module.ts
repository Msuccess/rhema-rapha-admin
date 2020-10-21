import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { AlertConfig, AlertModule } from 'ngx-bootstrap/alert';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
  },
  {
    path: 'reset-password',
    component: PasswordresetComponent,
  },
  { path: '**', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  providers: [AlertConfig],
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmComponent,
    PasswordresetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AlertModule.forRoot(),
    SharedModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthModule {}
