import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sanction } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class SanctionService {
  private baseUrl: string = `${environment.baseUrl}/sanctions`;
  constructor(private http: HttpClient) {
  }

  findAll(){
    return this.http.get<Sanction[]>(this.baseUrl);
  }

  save(sanction: Sanction){
    return this.http.post(this.baseUrl, sanction);
  }

}
