import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IappState } from "~/app.reducers";
import { AuthActions } from "~/auth/actions/auth.actions";
import { Authenticate, User } from "../models/user";
import { CheckoutService } from "./checkout.service";

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private actions: AuthActions,
    private store: Store<IappState>,
    private router: Router,
    private checkOutService: CheckoutService
  ) { }

  authorized(): Observable<{ status: string } & User> {
    return this.http
      .get<{ status: string } | User>("auth/authenticated")
      .pipe(catchError((error) => of(error.error)));
  }

  login({ email, password }: Authenticate): Observable<User> {
    const params = { spree_user: { email, password } };

    return this.http.post<User>("login.json", params).pipe(
      map((user) => {
        this.setTokenInLocalStorage(user);
        this.store.dispatch(this.actions.loginSuccess());

        return user;
      }),
      tap(
        (_) => this.router.navigate(["/"])
      )
    );
  }

  logout() {
    return this.http.get("logout.json").pipe(
      map((res: Response) => {
        localStorage.clear();
        this.store.dispatch(this.actions.logoutSuccess());

        return res;
      })
    );
  }

  register(data: User): Observable<User> {
    const params = { spree_user: data };

    return this.http.post<User>("auth/accounts", params).pipe(
      map((user) => {
        this.setTokenInLocalStorage(user);
        this.store.dispatch(this.actions.loginSuccess());

        return user;
      }, (error) => error
      )
    );
  }

  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    const userJson = localStorage.getItem("user") ? localStorage.getItem("user") : "{}";

    const user: User =
      ["undefined", null].indexOf(userJson) === -1
        ? JSON.parse(userJson)
        : {};

    return new HttpHeaders({
      "Content-Type": request.headers.get("Content-Type") || "application/json",
      "token-type": "Bearer",
      access_token: user.access_token || [],
      client: user.client || [],
      uid: user.uid || [],
      "Auth-Token": user.spree_api_key || [],
      "ng-api": "true",
      "Guest-Order-Token": this.checkOutService.getOrderToken() || []
    });
  }

  private setTokenInLocalStorage(userData: object): void {
    const jsonData = JSON.stringify(userData);
    localStorage.setItem("user", jsonData);
  }
}
