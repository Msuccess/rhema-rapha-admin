import { AuthService } from './../../auth/service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.auth.isTokenExpired() && this.auth.isAuthenticated()) {
      request = this.addToken(request, this.auth.getToken());
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('HttpResponse >>>', event);
        } else if (event instanceof HttpErrorResponse) {
          console.log('HttpErrorResponse >>>', event);
        }
        return event;
      }),
      // finalize(() => this.loader.complete())
    );
  }

  private addToken(request: HttpRequest<any>, token: any): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
