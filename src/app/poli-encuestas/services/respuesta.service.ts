import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  enviarRespuestas(encuestaId: number, respuestas: any[]): Observable<any> {
    const payload = {
      encuesta_id: encuestaId,
      respuestas: respuestas
    };

        console.log(payload);

    return this.http.post(`${this.apiUrl}/respuesta`, payload);
    
  }

  getRespuestasById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/respuesta/${id}`);
  }

}
