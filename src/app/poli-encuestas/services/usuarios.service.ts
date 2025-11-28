import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsuario(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  updateUsuario(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, payload);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }


  getRolesUsuario(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/roles/${id}`);
  }

  getEmpresasUsuario(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/empresas/ ${id}`);
  }

  actualizarRoles(usuarioId: number, roles: any[]): Observable<any> {
    let rolesFiltrados = roles.filter(r => r.activo);

    // Si no hay roles activos, agregar el rol por defecto
    if (rolesFiltrados.length === 0) {
      rolesFiltrados = [{ id: 1, activo: 1 }];
    }

    const payload = {
      usuario: usuarioId,
      roles: rolesFiltrados
    };

    return this.http.post(`${this.apiUrl}/users/roles/actualizar`, payload);
  }

  actualizarEmmpresas(usuarioId: number, empresas: any[]): Observable<any> {
    let empresasFiltradas = empresas.filter(r => r.activo);


    const payload = {
      usuario: usuarioId,
      empresas: empresasFiltradas
    };

    return this.http.post(`${this.apiUrl}/users/empresas/actualizar`, payload);
  }

}
