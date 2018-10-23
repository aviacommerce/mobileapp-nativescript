
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.injector.get(AuthService);

    const clonedRequest = request.clone({
      headers: auth.getTokenHeader(request),
      url: this.fixUrl(request.url)
    });

    return next.handle(clonedRequest);
  }

  private fixUrl(url: string) {
    if (url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + url;
    }
  }
}
