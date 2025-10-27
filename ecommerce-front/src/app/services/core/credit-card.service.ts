import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreditCard } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private baseUrl: string = `${environment.baseUrl}/cards`;

  constructor(private http: HttpClient) {
  }

  findByUserId(id: number) {
    return this.http.get<CreditCard[]>(`${this.baseUrl}/${id}`);
  }

  save(card: CreditCard) {
    return this.http.post(this.baseUrl, card);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
