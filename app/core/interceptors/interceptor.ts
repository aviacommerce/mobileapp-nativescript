
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({ url: this.fixUrl(request.url) });

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
