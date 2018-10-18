import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { User } from "~/core/models/user";
import { AuthService } from "~/core/services/auth.service";

@Component({
  moduleId: module.id,
  selector: "login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})

export class LoginRegisterComponent implements OnInit {
  isLoggingIn = true;
  user: User;

  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(private page: Page, private authService: AuthService) {
    this.page.actionBarHidden = false;
    this.user = new User();
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
    this.authService.login(this.user).subscribe();
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
}
