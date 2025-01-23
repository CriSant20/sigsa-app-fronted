import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../Interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api';

  constructor() { }

  getComentariosByTarea(id: number):Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/comentarios/tarea/${id}`);
  }

  createComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/comentarios`, comentario);
  }
}
