import { Injectable } from '@angular/core';
import { Rating } from '../../models/model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl: string = `${environment.baseUrl}/ratings`;

  constructor(private http: HttpClient) {
  }

  save(rating: Rating) {
    return this.http.post(`${this.baseUrl}`, rating);
  }
}
