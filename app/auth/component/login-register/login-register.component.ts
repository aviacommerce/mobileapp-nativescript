import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { User } from "~/core/models/user";
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
  isLoggingIn = true;
  user: User;
  subscriptionList$: Array<Subscription> = [];
  isProcessing: boolean;
  logoUrl = environment.config.logoUrl;

  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(
    private page: Page,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private router: RouterExtensions,
    private sharedService: SharedService) {
    this.user = new User();
    this.page.actionBarHidden = false;
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
      this.sharedService.alert("Please provide both an email address and password.");

      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.isProcessing = true;
    this.subscriptionList$.push(
      this.authService.login(this.user).subscribe((_) => {
        this.isProcessing = false;
        this.sharedService.alert("Login Success!.");
      }, (error) => {
        this.isProcessing = false;
        this.sharedService.alert("Something went worng.Try again!");
      })
    );
  }

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.sharedService.alert("Your passwords do not match.");

      return;
    } else {
      this.isProcessing = true;
      this.subscriptionList$.push(
        this.authService.register(this.user).subscribe(
          (_) => {
            this.isProcessing = false;
            this.sharedService.alert("Register Success!.");
            this.toggleForm();
          }, (_) => {
            this.isProcessing = false;
            this.sharedService.alert("Something went worng.Try again!");
          }
        )
      );
    }
  }

  onBack() {
    this.router.backToPreviousPage();
  }

  forgotPassword() {
    this.sharedService.alert("Forget Password");
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
