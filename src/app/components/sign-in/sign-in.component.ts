import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/core/auth/auth.service';
import { ApiError } from '@app/interfaces/api-error';
import { ReactiveFormData } from '@app/interfaces/reactive-form-data';
import { HttpErrorResponseApi } from '@app/models/http-error-response-api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  /**
   * Sign in form
   */
  form: ReactiveFormData = {
    error: {},
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    /**
     * Setup form.
     */
    this.form.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.form.form.controls;
  }

  /**
   * Submit credentials to sign the user in.
   */
  submit(): void {
    this.form.loading = true;
    this.form.error = {};

    this.authService.signIn(this.f.username.value, this.f.password.value).subscribe((): void => {
    }, (error: HttpErrorResponseApi): void => {
      this.form.loading = false;
      this.form.error = error.error;
      this.snackBar.open(error.error.non_field_errors[0]);
    });
  }
}
