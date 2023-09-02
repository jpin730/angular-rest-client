import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiURL}/users`;

  authenticate() {
    return this.http.get(`${this.baseURL}/1`);
  }
}
