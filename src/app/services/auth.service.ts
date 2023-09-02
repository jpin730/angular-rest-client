import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { REFRESH_TOKEN } from '../interceptors/token.interceptor';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiURL}/auth`;

  authenticate() {
    const context = new HttpContext().set(REFRESH_TOKEN, true);
    return this.http.get(`${this.baseURL}/check`, { context });
  }
}
