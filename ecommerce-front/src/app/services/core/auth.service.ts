import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Token, AuthRequestDto } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${environment.baseUrl}/auth`;
  private fingerprint: string = 'foo';

  constructor(private http: HttpClient) {
  }

  doLogin(authReq: AuthRequestDto) {
    authReq = { ...authReq, fingerprint: this.fingerprint };
    return this.http.post<Token>(`${this.baseUrl}/`, authReq)
      .pipe(
        tap(token => this.storeToken(token.authc))
      );
  }

  private storeToken(token: string) {
    localStorage.setItem('nibelungo', token);
  }

  getToken(): string | null {
    return localStorage.getItem('nibelungo');
  }
}
