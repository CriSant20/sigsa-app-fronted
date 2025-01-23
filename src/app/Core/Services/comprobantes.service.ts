import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comprobante } from '../Interfaces/comprobante.interface';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  constructor() { }

  getComprobanteByTarea(id: number): any {
    return this.http.get(`${this.apiUrl}/comprobantes/tarea/${id}`);
  }

  enviarComprobante(formData: FormData): Observable<Comprobante> {
    return this.http.post<Comprobante>(`${this.apiUrl}/comprobantes`, formData);
  }
}
