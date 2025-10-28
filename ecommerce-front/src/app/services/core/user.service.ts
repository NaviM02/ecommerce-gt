import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  findById(id: number){
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  findMe(){
    const id = this.authService.getUserId();
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  save(user: User){
    if (user.userId) return this.http.put(`${this.baseUrl}/${user.userId}`, user);
    return this.http.post(this.baseUrl, user);
  }

  findAll(roleIds?: number[], excludeRoleId?: number) {
    let params: any = {};
    if (roleIds && roleIds.length > 0) params.roleIds = roleIds.join(',');
    if (excludeRoleId) params.excludeRoleId = excludeRoleId;
    return this.http.get<User[]>(this.baseUrl, { params });
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
