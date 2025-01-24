import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from './registro.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-registro',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  
  encapsulation: ViewEncapsulation.ShadowDom    // Desactiva el encapsulamiento de estilos

})
export class RegistroComponent implements OnInit{
  users: any[] = [];
  
  userForm!: FormGroup;
  constructor(private usuarioService: RegistroService,    private fb: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      usuario_id: ['',],
      nombre_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numero: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      institucion: ['', Validators.required],
      carrera: ['', Validators.required],
      terms: [false, Validators.requiredTrue]  // Asegura que el checkbox esté marcado
    });
    
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      // Elimina el campo bus_id si no es necesario
      if (!userData.bus_id) {
        delete userData.usuario_id;
        delete userData.terms;
      }

      // Crear FormData e incluir los datos del formulario
      const formData = new FormData();
      for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
          formData.append(key, userData[key]);
        }
      }

      // Enviar los datos al servidor
      this.usuarioService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          alert('Usuario registrado con éxito.');
          this.userForm.reset(); // Limpia el formulario después del envío
        },
        error: (error) => {
          //console.error('Error al registrar el bus:', error);
          //alert('Hubo un error al registrar el bus.');
          console.error('Error al registrar el Usuario:', error);

          // Ignorar el error si es 500
          if (error.status !== 500) {
            console.log(userData);
            formData.forEach((value, key) => {
              console.log(`${key}: ${value}`);
            });
            alert('Hubo un error al registrar el Usuario:'+ error?.error?.message);
          } else {
            alert('Usuario registrado con éxito.');
            console.log('Error 500 ignorado');
            this.userForm.reset(); // Limpia el formulario después del envío
          }
        },
      });
    } else {
      
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

}
