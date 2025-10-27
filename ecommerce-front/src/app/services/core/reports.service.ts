import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  TopCustomerByOrdersDTO,
  TopCustomerBySpendingDTO,
  TopProductDTO, TopSellerByProductCountDTO,
  TopSellerDTO
} from '../../models/reports.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.baseUrl}/reports`;

  constructor(private http: HttpClient) {}

  getTopProducts(startDate: string, endDate: string) {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<TopProductDTO[]>(`${this.baseUrl}/top-products`, { params });
  }

  getTopCustomersBySpending(startDate: string, endDate: string) {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<TopCustomerBySpendingDTO[]>(`${this.baseUrl}/top-customers-spending`, { params });
  }

  getTopSellers(startDate: string, endDate: string){
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<TopSellerDTO[]>(`${this.baseUrl}/top-sellers`, { params });
  }

  getTopCustomersByOrders(startDate: string, endDate: string) {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<TopCustomerByOrdersDTO[]>(`${this.baseUrl}/top-customers-orders`, { params });
  }

  getTopSellersByProductCount() {
    return this.http.get<TopSellerByProductCountDTO[]>(`${this.baseUrl}/top-sellers-products`);
  }
}
