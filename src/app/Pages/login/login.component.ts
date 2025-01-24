import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { finalize } from 'rxjs/internal/operators/finalize';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
    encapsulation: ViewEncapsulation.ShadowDom    // Desactiva el encapsulamiento de estilos
  
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  private readonly authService = inject(AuthService);
  
  protected readonly isLoading = signal(false);


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      nombre_usuario: ['', [Validators.required,]],
      password: ['', Validators.required],
      remember: [false],
    });
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log('error', 'Error', 'Por favor, complete todos los campos correctamente');
      return;
    }

    this.isLoading.set(true);
    const loginData = this.loginForm.getRawValue();
    delete loginData.remember;
    this.authService.login(loginData).pipe(
      catchError(error => {
        const errorMessage = error.error?.message || 'Error en el inicio de sesión';
        console.log('error', 'Error', errorMessage);
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe(token => {
      if (token) {
        console.log('success', 'Éxito', 'Inicio de sesión exitoso');
      }
    });  }


}
