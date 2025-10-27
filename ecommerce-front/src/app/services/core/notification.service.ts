import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Notification } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl: string = `${environment.baseUrl}/notifications`;

  constructor(private http: HttpClient) {
  }

  findAll(){
    return this.http.get<Notification[]>(this.baseUrl);
  }
}
