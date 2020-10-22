import { AuthService } from './../service/auth.service';
import { ErrorService } from './../../core/services/error.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthModel } from '../model/auth.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    loading = new BehaviorSubject<boolean>(false);
    hasFormErrors = false;
    errors = new BehaviorSubject<any>([]);
    authCredential = {} as AuthModel;
    private unsubscribe: Subject<any>;
    /**
     * Component constructor
     *
     * @param authNoticeService: AuthNoticeService
     * @param translate: TranslateService
     * @param router: Router
     * @param auth: AuthService
     * @param store: Store<AppState>
     * @param fb: FormBuilder
     */
    constructor(
        private errorService: ErrorService,
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder
    ) {
        this.unsubscribe = new Subject();
    }

    /*
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit() {
        this.initRegisterForm();
    }

    /*
     * On destroy
     */
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initRegisterForm() {
        this.registerForm = this.fb.group({
            fullName: [
                this.authCredential.fullName,
                Validators.compose([Validators.required]),
            ],
            phonenumber: [
                this.authCredential.phonenumber,
                Validators.compose([Validators.required]),
            ],
            email: [
                this.authCredential.email,
                Validators.compose([Validators.required, Validators.email]),
            ],
            role: ['admin'],
            password: [
                this.authCredential.password,
                Validators.compose([Validators.required]),
            ],
        });
    }

    /**
     * Form Submit
     */
    submit() {
        this.hasFormErrors = false;
        this.loading.next(true);
        const controls = this.registerForm.controls;
        // check form
        if (this.registerForm.invalid) {
            Object.keys(controls).forEach((controlName) =>
                controls[controlName].markAsTouched()
            );
            this.hasFormErrors = true;
            return;
        }
        this.registerForm.value.password2 = this.registerForm.value.password1;

        this.auth.signUp(this.registerForm.value).subscribe(
            (res) => {
                this.loading.next(false);
                this.router.navigate(['/dashboard/']);
            },
            (err) => {
                this.hasFormErrors = true;
                this.loading.next(false);
                this.errors.next(this.errorService.getErrors(err));
            }
        );
    }

    /**
     * Close Alert
     *
     * @param $event: Event
     */
    close($event: any) {
        this.hasFormErrors = false;
        return $event;
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.registerForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }

    cancel() {
        this.router.navigate(['/auth/login']);
    }
}
