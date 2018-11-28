import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { IappState } from "./app.reducers";
import { getAuthStatus } from "./auth/reducers/selectors";
import { User } from "./core/models/user";
import { AuthService } from "./core/services/auth.service";
require("nativescript-localstorage");

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
  email: string;
  user: User;
  subscriptionList$: Array<Subscription> = [];
  isAuthenticated: boolean;
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private store: Store<IappState>,
    private authService: AuthService) { }

  ngOnInit(): void {
    this._activatedUrl = "/home";
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    this.checkUser();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  checkUser() {
    this.subscriptionList$.push(
      this.store.select(getAuthStatus).subscribe((auth) => {
        this.isAuthenticated = auth;
        if (localStorage.getItem("user")) {
          this.user = JSON.parse(localStorage.getItem("user"));
        }
      })
    );
  }

  logout() {
    this.subscriptionList$.push(
      this.authService.logout().subscribe((_) => this.router.navigate(["/"]))
    );
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
