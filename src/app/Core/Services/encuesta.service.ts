import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Encuesta } from '../Interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';
  constructor() { }

  getEncuestaById(id: number) {
    return this.http.get<Encuesta>(`${this.apiUrl}/encuesta/${id}`);
  }

  createEncuesta(encuesta: Encuesta) {
    return this.http.post<Encuesta>(`${this.apiUrl}/encuesta`, encuesta);
  }
}
