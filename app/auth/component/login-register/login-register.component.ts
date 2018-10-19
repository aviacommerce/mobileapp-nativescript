import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
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

  constructor(private page: Page, private authService: AuthService) {
    this.page.actionBarHidden = false;
    // this.user = new User();
    this.user = {
      email: "gopalshimpi@gmail.com",
      password: "gopal123",
      confirmPassword: "123"
    };
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  ngOnInit(): void {
    // Init your component properties here.
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
      this.authService.login(this.user).subscribe()
    );
  }

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.alert("Your passwords do not match.");

      return;
    }

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
      title: "APP NAME",
      okButtonText: "OK",
      message: msg
    });
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
