// cookie.interceptor.ts
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly CookieService:CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = this.addAuthTokenFromCookie(request);
    return next.handle(modifiedRequest);
  }

  private addAuthTokenFromCookie(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.CookieService.get('auth');

    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return request;
  }

}
