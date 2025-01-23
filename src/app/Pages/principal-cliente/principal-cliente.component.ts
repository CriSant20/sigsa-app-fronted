import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { UserProfile } from '../../Core/Interfaces/user-profile';
import { Tarea } from '../../Core/Interfaces/tarea.interface';
import { TareasService } from '../../Core/Services/tareas.service';

@Component({
  selector: 'app-principal-cliente',
  templateUrl: './principal-cliente.component.html',
  styleUrls: ['./principal-cliente.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PrincipalCliente {

  authService = inject(AuthService);
  tareasService = inject(TareasService);

  id: number | undefined = undefined;
  perfilVisible = false;
  tareaSeleccionada: any = null;
  informacionVisible = false;
  comentarioVisible = false;
  encuestaVisible = false;
  agregarTareaVisible = false;
  editando = false;
  searchQuery = '';
  filterState = '';
  fechaInicio: string | null = null;
  fechaFin: string | null = null;
  comentarios = '';

  usuario?: UserProfile;

  foto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL0kG6yP7wgQSOk_hswRbbB1Cs3LpAWtLIBg&s'


  tareasUsuarios: Tarea[]  = []

  encuesta = {
    atencion: '',
    resolucion: '',
    comentarios: ''
  };
  nuevaTarea = {
    nombre: '',
    tipo: '',
    detalle: '',
    rubrica: '',
    adjunto: null as File | null
  };

  constructor(private router: Router) {
   this.id = this.authService.getUserProfile()!.usuario_id;
    this.authService.getUser(this.id!).subscribe((user) => {
      this.usuario = user;
    });
  }

  ngOnInit() {
    this.tareasService.getTareasByUser(this.id!).subscribe((tareas) => {
      console.log(tareas);
      this.tareasUsuarios = tareas;
    });
  }

  get filteredTareas() {
    return this.tareasUsuarios.filter((tarea) => {
      const matchesQuery =
        !this.searchQuery || tarea.nombre.includes(this.searchQuery);
      const matchesState = !this.filterState || tarea.estado === this.filterState;
      const matchesFechaInicio = !this.fechaInicio || new Date(tarea.fecha_envio) >= new Date(this.fechaInicio);
      const matchesfechaFin = !this.fechaFin || new Date(tarea.fecha_a_realizar) <= new Date(this.fechaFin);
      return matchesQuery && matchesState && matchesFechaInicio && matchesfechaFin;
    });
  }

  mostrarSolicitudes() {
    this.perfilVisible = false;
  }

  mostrarPerfil() {
    this.perfilVisible = true;
  }

  cerrarPerfil() {
    this.perfilVisible = false;
  }

  editarPerfil() {
   console.log(this.usuario);
   if(!this.usuario){
     alert("Usuario no encontrado");
     return;
   }
   const {usuario_id, ...profile} = this.usuario;
   this.authService.updateProfile(profile, usuario_id!).subscribe((profile) => {
     alert("Perfil guardado con éxito.");
     this.editando = false;
   });
  }


  cancelarTarea(tarea: any, event: Event) {
    event.stopPropagation();
    alert(`Tarea cancelada para ${tarea.nombre}`);
  }

  pagar(tarea: any, event: Event) {
    event.stopPropagation();
    alert(`Pago realizado para ${tarea.nombre}`);
  }

  abrirChat(tarea: any, event: Event) {
    event.stopPropagation();
    this.comentarioVisible = true;
  }

  mostrarInformacion(tarea: any, event: Event) {
    event.stopPropagation();
    this.tareaSeleccionada = tarea;
    this.informacionVisible = true;
  }

  cerrarModalInformacion() {
    this.informacionVisible = false;
  }

  cerrarModalComentario() {
    this.comentarioVisible = false;
  }

  guardarComentario() {
    alert('Comentario guardado.');
    this.cerrarModalComentario();
  }

  borrarFiltros() {
    this.searchQuery = '';
    this.filterState = '';
    this.fechaInicio = null;
    this.fechaFin = null;
  }

  abrirEncuesta() {
    this.encuestaVisible = true;
  }

  cerrarEncuesta() {
    this.encuestaVisible = false;
  }

  enviarEncuesta() {
    alert('Encuesta enviada. ¡Gracias por tu feedback!');
    this.cerrarEncuesta();
  }

  seleccionarTarea(tarea: any) {
    this.tareaSeleccionada = tarea;
  }

  cerrarModalTarea() {
    this.tareaSeleccionada = null;
  }

  cerrarSesion() {
    window.location.href = 'http://localhost:4200/login';
  }

  abrirModalAgregarTarea() {
    this.agregarTareaVisible = true;
  }

  cerrarModalAgregarTarea() {
    this.agregarTareaVisible = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevaTarea.adjunto = file;
    }
  }

  guardarTarea() {
    alert('Tarea guardada con éxito.');
    this.cerrarModalAgregarTarea();
  }

}