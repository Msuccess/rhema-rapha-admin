import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { UIModule } from '../shared/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ConfirmComponent,
        PasswordresetComponent,
    ],
    imports: [CommonModule, ReactiveFormsModule, UIModule, AuthRoutingModule],
})
export class AuthModule {}
