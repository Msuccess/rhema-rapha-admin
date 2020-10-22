import { AuthEndPoints } from './../../core/constant/api-endpoints';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authEndpoint: AuthEndPoints;
  constructor(
    public httpClient: HttpClient,
    private tokenStorage: TokenStorage,
  ) {
    this.authEndpoint = new AuthEndPoints();
  }

  public signIn(credential: any): Observable<any> {
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_LOGIN, credential)
      .pipe(
        tap((res: any) => {
          console.log(res.data);
          this.tokenStorage.setAccessToken(res.data.token.token, true);
          this.tokenStorage.setUser(res.data.dbUser, true);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public signUp(credential: any): Observable<any> {
    const newCredential = { ...credential };
    return this.httpClient
      .post(this.authEndpoint.API_AUTH_REGISTER, newCredential)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public signOut(): Observable<any> {
    return this.httpClient.post('', null).pipe(
      tap((res: any) => this.tokenStorage.clear()),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public refreshToken(): any {
    return;
  }

  isTokenExpired(): boolean {
    return false;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.tokenStorage.getAccessToken(true);
  }

  getRoles(): string[] {
    return [];
  }

  decodeJwtToken(): any {
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
