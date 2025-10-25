import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Token, AuthRequestDto, DecodedToken } from '../../models/model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${environment.baseUrl}/auth`;
  private storageKey = 'nibelungo';

  constructor(private http: HttpClient) {
  }

  doLogin(authReq: AuthRequestDto) {
    return this.http.post<Token>(`${this.baseUrl}`, authReq)
      .pipe(
        tap(token => this.storeToken(token.token))
      );
  }

  private storeToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken(): string | null {

    return localStorage.getItem(this.storageKey);
  }

  clearToken() {
    localStorage.removeItem(this.storageKey);
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (e) {
      console.error('Token inválido', e);
      return null;
    }
  }

  getUserRole(): number | null {
    return this.getDecodedToken()?.role ?? null;
  }

  getUsername(): string | null {
    return this.getDecodedToken()?.sub ?? null;
  }

  getUserId(): number | null {
    return this.getDecodedToken()?.userId ?? null;
  }

  isAuthenticated(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;
    return decoded.exp * 1000 > Date.now();
  }
}
