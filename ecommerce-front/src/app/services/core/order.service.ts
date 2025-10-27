import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = `${environment.baseUrl}/orders`;
  constructor(private http: HttpClient) {
  }

  findById(id: number) {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  findAll(){
    return this.http.get<Order[]>(this.baseUrl);
  }

  save(order: Order){
    return this.http.post(this.baseUrl, order);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
