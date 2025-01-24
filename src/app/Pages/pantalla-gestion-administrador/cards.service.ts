import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private apiUrl = 'http://localhost:3000/api/tareas';


  constructor(private http: HttpClient) { }

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Devuelve un array de objetos de la API
  }
}
