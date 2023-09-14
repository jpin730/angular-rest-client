import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment';
import { API_DEFAULT_LIMIT, API_DEFAULT_OFFSET } from '../utils/constants';
import { GetCategories } from '../interfaces/api-categories-responses';
import { CategoryFormValue } from '../interfaces/category-editor-dialog';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiURL}/category`;
  private searchBaseURL = `${environment.apiURL}/search/categories`;

  getCategories(limit = API_DEFAULT_LIMIT, offset = API_DEFAULT_OFFSET) {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<GetCategories>(this.baseURL, { params });
  }

  searchCategories(query: string, limit = API_DEFAULT_LIMIT, offset = API_DEFAULT_OFFSET) {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<GetCategories>(`${this.searchBaseURL}//${query}`, {
      params,
    });
  }

  createCategory(category: CategoryFormValue) {
    return this.http.post(`${this.baseURL}`, { ...category });
  }

  editCategory({ id, ...category }: CategoryFormValue & { id: string }) {
    return this.http.put(`${this.baseURL}/${id}`, { ...category });
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
