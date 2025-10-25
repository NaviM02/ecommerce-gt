import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = `${environment.baseUrl}/categories`;

  constructor(private http: HttpClient) {
  }

  findById(id: number){
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  save(category: Category){
    if (category.categoryId) return this.http.put(`${this.baseUrl}/${category.categoryId}`, category);
    return this.http.post(this.baseUrl, category);
  }

  findAll(){
    return this.http.get<Category[]>(this.baseUrl);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
