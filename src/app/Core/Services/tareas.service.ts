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

  createTarea(tarea: Tarea): Observable<Tarea> {
    const formData = new FormData();
    
    // Append file if exists
    if (tarea.adjunto) {
      formData.append('adjunto', tarea.adjunto);
    }
    
    // Remove adjunto from tarea object before sending
    const { adjunto, ...tareaData } = tarea;
    
    // Append tarea data as JSON string
    Object.keys(tareaData).forEach(key => {
      // @ts-ignore
      formData.append(key, tareaData[key]);
    });

    return this.http.post<Tarea>(`${this.apiUrl}/tareas`, formData);
  }

  updateEstado(tareaId: number, tarea: { estado: string }): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/tareas/${tareaId}`, tarea);
  }
  
  
  
}
