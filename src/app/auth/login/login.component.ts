import { AuthService } from './../service/auth.service';
import { first } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error = '';
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        // reset login status
        this.authService.signOut();

        // get return url from route parameters or default to '/'
        // tslint:disable-next-line: no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    /**
     * On submit form
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService
            .signIn(this.f.email.value)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                },
                (error) => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
}
