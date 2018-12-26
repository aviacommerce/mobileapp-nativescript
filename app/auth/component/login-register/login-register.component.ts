import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { isAndroid } from "tns-core-modules/ui/page/page";
import { AuthService } from "~/core/services/auth.service";
import { SharedService } from "~/core/services/shared.service";
import { environment } from "~/environments/environment";

@Component({
  moduleId: module.id,
  selector: "login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})

export class LoginRegisterComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  subscriptionList$: Array<Subscription> = [];
  isProcessing: boolean;
  isHidePassword = true;
  isLoggingIn = true;
  registerSubs: Subscription;
  loginSubs: Subscription;
  appName = environment.config.appName;
  isAndroid = isAndroid;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.subscriptionList$.push(
      this.activatedRouter.queryParams.subscribe((params) => {
        const { signUpFlag } = params;
        this.isLoggingIn = !signUpFlag;
      })
    );

    this.initSignInForm();
    this.initSignUpForm();
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  login1() {
    const loginData = this.signInForm.value;
    if (this.signInForm.valid) {
      this.isProcessing = true;
      this.subscriptionList$.push(
        this.authService.login(loginData).subscribe((_) => {
          this.isProcessing = false;
          this.sharedService.successMessage("Login Success!.");
        }, (error) => {
          this.isProcessing = false;
          this.sharedService.errorMessage("Something went worng.Try again!");
        })
      );
    }
  }

  register() {
    const values = this.signUpForm.value;
    const keys = Object.keys(values);
    if (this.signUpForm.valid) {
      this.isProcessing = true;
      this.registerSubs = this.authService
        .register(values).pipe(
          tap((_) => {
            this.isProcessing = false;
            this.sharedService.successMessage("Register Success!.");
            this.toggleForm();
          }, (error) => {
            this.isProcessing = false;
            this.sharedService.errorMessage("Something went worng.Try again!");
            const errors = error.errors || {};
            keys.forEach((val) => {
              if (errors[val]) { this.pushErrorFor(val, errors[val][0]); }
            });
          })).subscribe();
    } else {
      keys.forEach((val) => {
        const ctrl = this.signUpForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        }
      });
    }
  }

  login() {
    const values = this.signInForm.value;
    const keys = Object.keys(values);

    if (this.signInForm.valid) {
      this.isProcessing = true;
      this.loginSubs = this.authService
        .login(values)
        .pipe(
          tap(
            (_) => this.isProcessing = false,
            (error) => {
              this.isProcessing = false;
              const errors = error.error.error || "Something went wrong";
              keys.forEach((val) => {
                this.pushErrorFor(val, errors);
              });
            }
          )
        ).subscribe();
    } else {
      keys.forEach((val) => {
        const ctrl = this.signInForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        }
      });
    }
  }

  forgotPassword() {
    this.sharedService.infoMessage("Forget Password");
  }

  initSignInForm() {
    const email = "";
    const password = "";
    this.signInForm = this.fb.group({
      email: [email, Validators.required],
      password: [password, Validators.required]
    });
  }

  initSignUpForm() {
    const email = "";
    const password = "";
    const passwordConfirmation = "";
    this.signUpForm = this.fb.group({
      email: [email, Validators.compose([Validators.required, Validators.email])],
      password: [password, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [passwordConfirmation, Validators.compose([Validators.required, Validators.minLength(6)])]
    },
      { validator: this.matchingPasswords("password", "password_confirmation") }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: boolean } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return { mismatchedPasswords: true };
      }
    };
  }

  showPassword(isHidePassword: boolean) {
    return this.isHidePassword = !isHidePassword;
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }

  private pushErrorFor(ctrlName: string, msg: string) {
    this.signUpForm.controls[ctrlName].setErrors({ msg });
  }
}
