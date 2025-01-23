import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { UserProfile } from '../../Core/Interfaces/user-profile';
import { Tarea } from '../../Core/Interfaces/tarea.interface';
import { TareasService } from '../../Core/Services/tareas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  tareaSeleccionada: Tarea | null = null;

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
  nuevaTarea!: Tarea;

  usuario?: UserProfile;

  foto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL0kG6yP7wgQSOk_hswRbbB1Cs3LpAWtLIBg&s'


  tareasUsuarios: Tarea[] = []

  encuesta = {
    atencion: '',
    calidad: '',
    costo: '',
    nota: ''
  };



  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.id = this.authService.getUserProfile()!.usuario_id;

    this.nuevaTarea = {
      nombre: '',
      indicaciones: '',
      usuario_cliente_id: this.id!,
      rubrica: '',
      fecha_a_realizar: '',
      tipo_tarea: '',
      adjunto: undefined as File | undefined
    };

    this.authService.getUser(this.id!).subscribe((user) => {
      this.usuario = user;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit() {
    this.getTareas();
  }

  getTareas(){
    this.tareasService.getTareasByUser(this.id!).subscribe((tareas) => {
      console.log(tareas);
      this.tareasUsuarios = tareas;
    });
  }

  get filteredTareas() {
    return this.tareasUsuarios.filter((tarea) => {
      // Search by name
      const matchesSearch = !this.searchQuery || 
        tarea.nombre.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // State filter
      const matchesState = !this.filterState || tarea.estado === this.filterState;
      
      // Date filters - handle undefined and null cases
      const tareaFechaEnvio = tarea.fecha_envio ? new Date(tarea.fecha_envio) : null;
      const tareaFechaRealizar = tarea.fecha_a_realizar ? new Date(tarea.fecha_a_realizar) : null;
      const fechaInicioDate = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const fechaFinDate = this.fechaFin ? new Date(this.fechaFin) : null;
  
      // Compare dates only if they exist
      const matchesFechaInicio = !fechaInicioDate || !tareaFechaEnvio || 
        tareaFechaEnvio.getTime() >= fechaInicioDate.getTime();
      
      const matchesFechaFin = !fechaFinDate || !tareaFechaRealizar || 
        tareaFechaRealizar.getTime() <= fechaFinDate.getTime();
  
      return matchesSearch && matchesState && matchesFechaInicio && matchesFechaFin;
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
    if (!this.usuario) {
      alert("Usuario no encontrado");
      return;
    }
    const { usuario_id, ...profile } = this.usuario;
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
    this.fechaInicio = '';
    this.fechaFin = '';
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
    this.authService.logOut();
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
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        event.target.value = '';
        return;
      }
      if (file.size > 1024 * 1024 * 8) { // 8MB max
        alert('El archivo no debe superar 8MB');
        event.target.value = '';
        return;
      }
      this.nuevaTarea.adjunto = file;
    }
  }

  guardarTarea() {
    if (!this.nuevaTarea.adjunto) {
      alert('Debe adjuntar un archivo PDF');
      return;
    }

    this.tareasService.createTarea(this.nuevaTarea).subscribe({
      next: (tarea) => {
        alert('Tarea guardada con éxito');
        this.resetForm();
        this.cerrarModalAgregarTarea();
        this.getTareas();
      },
      error: (error) => {
        alert('Error al guardar la tarea: ' + error.message);
        console.error('Error:', error);
      }
    });
  }

  private resetForm() {
    this.nuevaTarea = {
      nombre: '',
      indicaciones: '',
      usuario_cliente_id: this.id!,
      rubrica: '',
      fecha_a_realizar: '',
      tipo_tarea: '',
      adjunto: undefined
    };
  }

}