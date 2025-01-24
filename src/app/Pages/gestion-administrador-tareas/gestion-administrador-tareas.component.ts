import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-administrador-tareas',
  imports: [
    FooterComponent,
    MenuComponent,
    NavbarComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './gestion-administrador-tareas.component.html',
  styleUrls: ['./gestion-administrador-tareas.component.css'],
  standalone: true,
})
export class GestionAdministradorTareasComponent {
  data = [
    {
      id: 1,
      name: 'Informe de rendimiento',
      date: '21/01/2024',
      status: 0,
      rubrica: '3 puntos presentación, 4 puntos creatividad',
      cliente: 'Manuel Medina',
      showDetails: false,
      comment: '', // Nuevo campo para guardar el comentario
    },
    {
      id: 2,
      name: 'Collage',
      date: '21/01/2024',
      status: 1,
      rubrica: '6 puntos presentación, 4 puntos creatividad',
      cliente: 'Pepe Peña',
      showDetails: false,
      comment: '', // Nuevo campo para guardar el comentario
    },
  ];

  // Modal: Fila seleccionada para emitir comentarios
  currentRow: any = null;

  // Establece la fila actual seleccionada al abrir el modal
  setCurrentRow(index: number): void {
    this.currentRow = this.data[index];
  }

  // Guarda el comentario ingresado en la fila actual
  saveComment(): void {
    if (this.currentRow) {
      console.log(
        `Comentario guardado para la tarea ${this.currentRow.name}: ${this.currentRow.comment}`
      );
      alert('Comentario guardado exitosamente.');
    }
  }

  // Alterna la visibilidad de los detalles
  toggleDetails(index: number): void {
    this.data[index].showDetails = !this.data[index].showDetails;
  }

  // Cambia el estado cíclicamente
  toggleStatus(index: number): void {
    this.data[index].status =
      (this.data[index].status + 1) % this.statusOptions.length;
  }

  // Gestiona el cambio de estado desde el select
  onStatusChange(index: number, value: number): void {
    console.log(`Estado cambiado a: ${value} en la fila ${index}`);
    this.data[index].status = value;
  }

  // Opciones de estado
  statusOptions = [
    { value: 0, label: 'En Revisión' },
    { value: 1, label: 'Aprobada - Pago Pendiente' },
    { value: 2, label: 'En Progreso' },
    { value: 3, label: 'Finalizado' },
  ];
}
