import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { UserProfile } from '../../Core/Interfaces/user-profile';
import {
  Comentario,
  Encuesta,
  Tarea,
} from '../../Core/Interfaces/tarea.interface';
import { TareasService } from '../../Core/Services/tareas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComentariosService } from '../../Core/Services/comentarios.service';
import { ComprobantesService } from '../../Core/Services/comprobantes.service';
import { EncuestaService } from '../../Core/Services/encuesta.service';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { FooterComponent } from '../../Components/footer/footer.component';
@Component({
  selector: 'app-gestion-administrador-tareas',
  templateUrl: './gestion-administrador-tareas.component.html',
  styleUrls: ['./gestion-administrador-tareas.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    MenuComponent,
    FooterComponent,
  ],
})
export class GestionAdministradorTareasComponent {
  TaskState = TaskState;

  authService = inject(AuthService);
  tareasService = inject(TareasService);
  comentariosService = inject(ComentariosService);
  comprobantesService = inject(ComprobantesService);
  encuestasService = inject(EncuestaService);

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
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  nuevaTarea!: Tarea;

  comprobanteVisible = false;
  comprobante: File | undefined;
  tareaParaComprobante: Tarea | null = null;

  usuario?: UserProfile;

  foto =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL0kG6yP7wgQSOk_hswRbbB1Cs3LpAWtLIBg&s';

  tareasUsuarios: Tarea[] = [];

  encuesta: Encuesta = {
    id_tarea: 0,
    atencion: '',
    costo: '',
    calidad: '',
    nota: 0,
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
      adjunto: undefined as File | undefined,
    };

    this.authService.getUser(this.id!).subscribe((user) => {
      this.usuario = user;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    console.log('URL before sanitizing:', url); // Add this line to debug
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.getTareas();
  }

  getTareas() {
    this.tareasService.getTareasByUser(this.id!).subscribe((tareas) => {
      this.tareasUsuarios = tareas;
    });
  }

  get filteredTareas() {
    return this.tareasUsuarios
      .filter((tarea) => {
        const matchesSearch =
          !this.searchQuery ||
          tarea.nombre.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesState =
          !this.filterState || tarea.estado === this.filterState;

        const tareaFechaEnvio = tarea.fecha_envio
          ? new Date(tarea.fecha_envio)
          : null;
        const tareaFechaRealizar = tarea.fecha_a_realizar
          ? new Date(tarea.fecha_a_realizar)
          : null;
        const fechaInicioDate = this.fechaInicio
          ? new Date(this.fechaInicio)
          : null;
        const fechaFinDate = this.fechaFin ? new Date(this.fechaFin) : null;

        const matchesFechaInicio =
          !fechaInicioDate ||
          !tareaFechaEnvio ||
          tareaFechaEnvio.getTime() >= fechaInicioDate.getTime();

        const matchesFechaFin =
          !fechaFinDate ||
          !tareaFechaRealizar ||
          tareaFechaRealizar.getTime() <= fechaFinDate.getTime();

        return (
          matchesSearch && matchesState && matchesFechaInicio && matchesFechaFin
        );
      })
      .sort((a, b) => {
        if (a.estado === 'Rechazada' && b.estado !== 'Rechazada') return 1;
        if (a.estado !== 'Rechazada' && b.estado === 'Rechazada') return -1;
        return 0;
      });
  }

  mostrarSolicitudes() {
    this.perfilVisible = false;
  }

  cancelarTarea(tarea: any, event: Event) {
    event.stopPropagation();
    alert(`Tarea cancelada para ${tarea.nombre}`);
  }

  abrirChat(tarea: Tarea, event: Event) {
    if (!event) return; // Guard clause
    event.preventDefault();
    event.stopPropagation();
    this.tareaSeleccionada = tarea;
    this.comentariosService
      .getComentariosByTarea(tarea.id!)
      .subscribe((comentarios) => {
        this.comentarios = comentarios;
        this.comentarioVisible = true;
      });
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
    if (!this.tareaSeleccionada) {
      alert('Error: No se pudo identificar la tarea');
      return;
    }

    if (!this.nuevoComentario.trim()) {
      alert('Por favor escriba un comentario');
      return;
    }

    const comentario: Comentario = {
      id_tarea: this.tareaSeleccionada.id!,
      id_usuario: this.id!,
      comentario: this.nuevoComentario.trim(),
    };

    this.comentariosService.createComentario(comentario).subscribe({
      next: (response) => {
        // Add new comment to list
        this.comentarios.push(response);
        // Clear input
        this.nuevoComentario = '';
        // Refresh comments
        this.comentariosService
          .getComentariosByTarea(this.tareaSeleccionada!.id!)
          .subscribe((comentarios) => {
            this.comentarios = comentarios;
          });
      },
      error: (error) => {
        alert('Error al guardar el comentario');
        console.error('Error:', error);
      },
    });
  }

  borrarFiltros() {
    this.searchQuery = '';
    this.filterState = '';
    this.fechaInicio = '';
    this.fechaFin = '';
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        event.target.value = '';
        return;
      }
      if (file.size > 1024 * 1024 * 8) {
        // 8MB max
        alert('El archivo no debe superar 8MB');
        event.target.value = '';
        return;
      }
      this.nuevaTarea.adjunto = file;
    }
  }

  private resetForm() {
    this.nuevaTarea = {
      nombre: '',
      indicaciones: '',
      usuario_cliente_id: this.id!,
      rubrica: '',
      fecha_a_realizar: '',
      tipo_tarea: '',
      adjunto: undefined,
    };
  }

  onComprobanteSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        event.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert('El archivo no debe superar 5MB');
        event.target.value = '';
        return;
      }
      this.comprobante = file;
    }
  }

  actualizarEstado(): void {
    if (this.tareaSeleccionada) {
      const tareaId = this.tareaSeleccionada.id; // ID de la tarea
      const nuevoEstado = this.tareaSeleccionada.estado; // Estado actual

      if (!tareaId || !nuevoEstado) {
        alert('Faltan datos para actualizar la tarea');
        console.error('Datos inválidos:', { tareaId, nuevoEstado });
        return;
      }

      console.log(`Actualizando estado de tarea ${tareaId} a "${nuevoEstado}"`);

      this.tareasService
        .updateEstado(tareaId, { estado: nuevoEstado })
        .subscribe(
          (res) => {
            alert('Estado de tarea actualizado con éxito');
          },
          (err) => {
            console.error('Error al actualizar estado:', err);
            alert(
              `Error al actualizar el estado de la tarea: ${
                err.error?.message || 'Error desconocido'
              }`
            );
          }
        );
    }
  }
}
