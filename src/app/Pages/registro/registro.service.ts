import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:3000/api/auth/registro';

  constructor(private http: HttpClient) {}


  createUser(bus: any): Observable<any> {
    return this.http.post(this.apiUrl, bus);
  }

  
}
