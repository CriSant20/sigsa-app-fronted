import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { environment } from '../../../environments/environemnts.dev';
import { map, Observable, tap } from 'rxjs';

//kevin
import { BehaviorSubject } from 'rxjs';
import { LoginInterface } from '../Interfaces/login.interface';
import { UserProfile } from '../Interfaces/user-profile';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api';

  //kevin
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(
    this.getUserProfile()
  );
  userProfile$ = this.userProfileSubject.asObservable();

  constructor() {}

  login(login: LoginInterface) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, login).pipe(
      map((res) => res.token),
      tap((token) => {
        this.saveToken(token);
        this.loadUserProfile();

        // Redirigir según rol
        this.getProfile().subscribe((profile) => {
          if (profile.rol === 'cliente') {
            this.router.navigate(['/principal-cliente']);
          } else {
            this.router.navigate(['/admin']);
          }
        });
      })
    );
  }
  getProfile() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.get<UserProfile>(`${this.apiUrl}/auth/perfil`, {
      headers,
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadUserProfile() {
    if (this.isAuthenticated()) {
      this.getProfile().subscribe({
        next: (profile) => {
          this.saveUserProfile(profile);
          this.userProfileSubject.next(profile);
        },
        error: (error) => console.error('Error cargando perfil:', error),
      });
    }
  }

  getCurrentUser(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  private saveUserProfile(profile: UserProfile) {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  }

   getUserProfile(): UserProfile | null {
    const profileStr = localStorage.getItem('user_profile');
    return profileStr ? JSON.parse(profileStr) : null;
  }

  getUser(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/usuario/${id}`);
  }

  updateProfile(profile: UserProfile, usuario_id:number): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/usuario/${usuario_id}`, profile);
  }
}
