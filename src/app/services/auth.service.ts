import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { REFRESH_TOKEN } from '../interceptors/token.interceptor';
import { GetAuthCheck, PostAuthLogin } from '../interfaces/api-auth-responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiURL}/auth`;

  authenticate() {
    const context = new HttpContext().set(REFRESH_TOKEN, true);
    return this.http.get<GetAuthCheck>(`${this.baseURL}/check`, { context });
  }

  login(email: string, password: string) {
    return this.http.post<PostAuthLogin>(`${this.baseURL}/login`, { email, password });
  }
}
