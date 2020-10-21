import { ErrorService } from './../../core/services/error.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthModel } from '../model/auth.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // Public params
  loginForm: FormGroup;
  loading = new BehaviorSubject<boolean>(false);
  authCredential = {} as AuthModel;
  errors = new BehaviorSubject<string>('');
  hasFormErrors = false;

  private unsubscribe: Subject<any>;
  returnUrl: any;

  // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private errorService: ErrorService,
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.initLoginForm();

    this.route.queryParams.subscribe((query: Params) => {
      this.loginForm.value.email = query.email ? +query.email : undefined;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading.complete();
  }

  /**
   * Close Alert
   *
   * @param $event: Event
   */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  /**
   * Form initalization
   * Default params, validators
   */
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        this.authCredential.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        this.authCredential.email,
        Validators.compose([Validators.required]),
      ],
    });
  }

  /**
   * Form Submit
   */
  submit() {
    this.loading.next(true);
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched(),
      );
      return;
    }

    this.auth.signIn(this.loginForm.value).subscribe(
      // tslint:disable-next-line: variable-name
      (_res) => {
        this.loading.next(false);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.loading.next(false);
        this.hasFormErrors = true;

        this.errors.next(this.errorService.getErrors(err));
        console.log(this.errors.getValue());
      },
    );
  }

  onClosed(dismissedAlert: any): void {
    // tslint:disable-next-line: no-unused-expression
    alert !== dismissedAlert;
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to validators name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
