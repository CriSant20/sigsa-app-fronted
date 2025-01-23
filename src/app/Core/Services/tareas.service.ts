import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tarea } from '../Interfaces/tarea.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';
  constructor() { }

  getTareasByUser(id: number):Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/tareas/usuario/${id}`);
  }

  createTarea(tarea: Tarea):Observable<Tarea> {
    return this.http.post<Tarea>(`${this.apiUrl}/tareas`, tarea);
  }

  
}
