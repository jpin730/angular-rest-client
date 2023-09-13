import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetUsers } from '../interfaces/api-users-responses';
import { API_DEFAULT_LIMIT, API_DEFAULT_OFFSET } from '../utils/constants';
import { UserFormValue } from '../interfaces/user-editor-dialog';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiURL}/users`;

  getUsers(limit = API_DEFAULT_LIMIT, offset = API_DEFAULT_OFFSET) {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<GetUsers>(this.baseURL, { params });
  }

  searchUsers(query: string, limit = API_DEFAULT_LIMIT, offset = API_DEFAULT_OFFSET) {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<GetUsers>(`${environment.apiURL}/search/users/${query}`, { params });
  }

  createUser(user: UserFormValue) {
    return this.http.post(`${this.baseURL}`, { ...user });
  }

  editUser({ id, password, ...user }: UserFormValue & { id: string }) {
    return this.http.put(`${this.baseURL}/${id}`, { ...user, password: password || undefined });
  }
}
