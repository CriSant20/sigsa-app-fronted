import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService1 {
  private apiUrl = 'http://localhost:3000/api/encuesta';

  constructor(private http: HttpClient) {}

  obtenerEncuestas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerEncuestaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  obtenerEncuestaPorTarea(idTarea: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tarea/${idTarea}`);
  }

  crearEncuesta(encuesta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, encuesta);
  }
}