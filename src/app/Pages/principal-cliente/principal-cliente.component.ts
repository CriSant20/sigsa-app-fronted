import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubirComprobanteComponent } from '../../Components/subir-comprobante/subir-comprobante.component';
@Component({
  selector: 'app-principal-cliente',
  templateUrl: './principal-cliente.component.html',
  styleUrls: ['./principal-cliente.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SubirComprobanteComponent,]
})
export class PrincipalCliente {

  
  perfilVisible = false;
  tareaSeleccionada: any = null;
  encuestaVisible = false;
  searchQuery = '';
  filterState = '';
  startDate: string | null = null;
  endDate: string | null = null;
  usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    celular: '0987654321',
    correo: 'juan.perez@example.com',
    institucion: 'Universidad Técnica',
    carrera: 'Ingeniería en Sistemas',
  };
  tareas = [
    { nombre: 'Tarea 1', fechaEntrega: '2025-01-25', estado: 'en revision' },
    { nombre: 'Tarea 2', fechaEntrega: '2025-01-30', estado: 'aprobado' },
  ];
  encuesta = {
    atencion: '',
    resolucion: '',
    comentarios: ''
  };
  mostrarComprobante: boolean = false;




  constructor(private router: Router, ) {}

  get filteredTareas() {
    return this.tareas.filter((tarea) => {
      const matchesQuery =
        !this.searchQuery || tarea.nombre.includes(this.searchQuery);
      const matchesState = !this.filterState || tarea.estado === this.filterState;
      const matchesStartDate = !this.startDate || new Date(tarea.fechaEntrega) >= new Date(this.startDate);
      const matchesEndDate = !this.endDate || new Date(tarea.fechaEntrega) <= new Date(this.endDate);
      return matchesQuery && matchesState && matchesStartDate && matchesEndDate;
    });
  }

  showPerfil() {
    this.perfilVisible = true;
  }

  closePerfil() {
    this.perfilVisible = false;
  }

  cancelarPago(tarea: any, event: Event) {
    event.stopPropagation();
    alert(`Pago cancelado para ${tarea.nombre}`);
  }
  cerrarComprobante(): void {
    this.mostrarComprobante = false;
  }
  pagar(tarea: any, event: Event) {
    this.mostrarComprobante = true;
    event.stopPropagation();
    alert(`Pago realizado para ${tarea.nombre}`);
  }

  abrirChat(tarea: any, event: Event) {
    event.stopPropagation();
    alert(`Chat abierto para ${tarea.nombre}`);
  }

  borrarFiltros() {
    this.searchQuery = '';
    this.filterState = '';
    this.startDate = null;
    this.endDate = null;
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

  agregarTarea() {
    alert('Funcionalidad para agregar tarea aún no implementada.');
  }

  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}