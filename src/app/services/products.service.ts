import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { API_DEFAULT_LIMIT, API_DEFAULT_OFFSET } from '../utils/constants';
import { ProductFormValue } from '../types/product';
import { GetProducts } from '../types/api-products-responses';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiURL}/product`;
  private searchBaseURL = `${environment.apiURL}/search/products`;

  getProducts(limit = API_DEFAULT_LIMIT, offset = API_DEFAULT_OFFSET) {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<GetProducts>(this.baseURL, { params });
  }

  searchProducts(query: string, limit = API_DEFAULT_LIMIT, offset = API_DEFAULT_OFFSET) {
    const params = new HttpParams({ fromObject: { limit, offset } });
    return this.http.get<GetProducts>(`${this.searchBaseURL}//${query}`, {
      params,
    });
  }

  createProduct(product: ProductFormValue) {
    return this.http.post(`${this.baseURL}`, { ...product });
  }

  editProduct({ id, ...product }: ProductFormValue & { id: string }) {
    return this.http.put(`${this.baseURL}/${id}`, { ...product });
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
