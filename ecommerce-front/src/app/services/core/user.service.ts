import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) {
  }

  findById(id: number){
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  save(user: User){
    if (user.userId) return this.http.put(`${this.baseUrl}/${user.userId}`, user);
    return this.http.post(this.baseUrl, user);
  }

  findAll(){
    return this.http.get<User[]>(this.baseUrl);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
