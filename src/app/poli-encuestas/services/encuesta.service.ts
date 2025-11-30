import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postEncuesta(empresaId: number, jsonEncuesta: any): Observable<any> {
    const body = {
        empresa: empresaId,
        json: jsonEncuesta
    };

    return this.http.post(`${this.apiUrl}/encuesta`, body);
  }

  getEncuestasPorUsuario(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuesta/user/${userId}`);
  }

  getEncuestaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuesta/${id}`);
  }

  deleteEncuesta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/encuesta/${id}`);
  }

  updateEncuesta(id: number, empresa: number, json: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/encuesta/${id}`, {
        empresa: empresa,
        data: json
    });
  }


}
