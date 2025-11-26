import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  PostEmpresa(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empresa`, data);
  }

  getEmpresa(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/empresa`);
  }

  deleteEmpresa(id: number) {
    return this.http.delete(`${this.apiUrl}/empresa/${id}`);
  }

  updateEmpresa(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/empresa/${id}`, data);
  }


}
