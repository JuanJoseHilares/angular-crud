import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { Product, SaveProduct } from '../interfaces/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getAll(active?: boolean) {
    let query = '';
  
    if (active === true) {
      query = '?active=true';
    } else if (active === false) {
      query = '?active=false';
    }
  
    return this.http.get<ApiResponse<Product[]>>(`${environment.api}/v1/products${query}`);
  }
  

  create(request: SaveProduct) {
    return this.http.post<ApiResponse<Product>>(`${environment.api}/v1/products`, request);
  }

  update(id: number, request: SaveProduct) {
    return this.http.put<ApiResponse<Product>>(`${environment.api}/v1/products/${id}`, request);
  }

  inactive(id: number) {
    return this.http.delete<ApiResponse<any>>(`${environment.api}/v1/products/${id}/inactive`);
  }

  getById(id: number) {
    return this.http.get<ApiResponse<Product>>(`${environment.api}/v1/products/${id}`);
  }
  
}
