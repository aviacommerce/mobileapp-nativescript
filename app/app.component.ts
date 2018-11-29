import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { IappState } from "./app.reducers";
import { AuthActions } from "./auth/actions/auth.actions";
import { getAuthStatus } from "./auth/reducers/selectors";
import { User } from "./core/models/user";
import { AuthService } from "./core/services/auth.service";
import { CheckoutService } from "./core/services/checkout.service";
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
    private authService: AuthService,
    private checkOutservice: CheckoutService,
    private authActions: AuthActions) { }

  ngOnInit(): void {
    this.checkUser();
    this.checkOrder();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  checkUser() {
    this.store.dispatch(this.authActions.authorize());
    this.subscriptionList$.push(
      this.store.select(getAuthStatus).subscribe((auth) => {
        this.isAuthenticated = auth;
        if (localStorage.getItem("user")) {
          this.user = JSON.parse(localStorage.getItem("user"));
        } else {
          this.store.dispatch(this.authActions.logoutSuccess());
        }
      })
    );
  }

  checkOrder() {
    this.subscriptionList$.push(
      this.checkOutservice.fetchCurrentOrder().subscribe()
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
