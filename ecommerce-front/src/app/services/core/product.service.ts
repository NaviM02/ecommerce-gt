import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = `${environment.baseUrl}/products`;

  constructor(private http: HttpClient) {
  }

  findById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  findByUserId(userId: number){
    return this.http.get<Product[]>(`${this.baseUrl}/user/${userId}`);
  }

  save(product: Product, image?: File) {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }))
    if (image) formData.append('image', image);

    if (!product.productId) return this.http.post<Product>(this.baseUrl, formData);
    return this.http.put<Product>(`${this.baseUrl}/${product.productId}`, formData);
  }

  findAll(status?: number){
    const options = status ? { params: { status } } : {};
    return this.http.get<Product[]>(this.baseUrl, options);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
