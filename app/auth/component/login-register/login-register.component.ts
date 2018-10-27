import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { User } from "~/core/models/user";
import { AuthService } from "~/core/services/auth.service";
@Component({
  moduleId: module.id,
  selector: "login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})

export class LoginRegisterComponent implements OnInit, OnDestroy {
  isLoggingIn = true;
  user: any;
  subscriptionList$: Array<Subscription> = [];

  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(
    private page: Page,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private router: RouterExtensions) {
    // this.user = new User();
    this.page.actionBarHidden = false;
    this.user = {
      email: "jaypal@aviabird.com",
      password: "flip@412",
      confirmPassword: "flip@412"
    };
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  ngOnInit(): void {
    this.subscriptionList$.push(
      this.activatedRouter.queryParams.subscribe((params) => {
        const { signUpFlag } = params;
        this.isLoggingIn = !signUpFlag;
      })
    );
  }

  submit() {
    if (!this.user.email || !this.user.password) {
      this.alert("Please provide both an email address and password.");

      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.subscriptionList$.push(
      this.authService.login(this.user).subscribe((_) => {
        this.alert("Login Success!.");
      }, (_) => {
        this.alert("Something went worng.Try again!");
      })
    );
  }

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.alert("Your passwords do not match.");

      return;
    } else {
      this.subscriptionList$.push(
        this.authService.register(this.user).subscribe(
          (_) => {
            this.alert("Register Success!.");
            this.toggleForm();
          }, (_) => {
            this.alert("Something went worng.Try again!");
          }
        )
      );
    }
  }

  onBack() {
    this.router.backToPreviousPage();
  }

  forgotPassword() {
    this.alert("Forget Passwrd");
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }

  alert(msg: string) {
    return alert({
      okButtonText: "OK",
      message: msg
    });
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
