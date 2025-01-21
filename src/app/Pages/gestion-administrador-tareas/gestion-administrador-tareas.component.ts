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
  styleUrls: ['./gestion-administrador-tareas.component.css'], // Corregido typo `styleUrl` a `styleUrls`
  standalone: true,
})
export class GestionAdministradorTareasComponent {
  data = [
    {
      id: 1,
      name: 'Informe de rendimiento',
      date: '21/01/2024',
      status: 0,
      rubrica: '3 puntos presentacion, 4 puntos creatividad',
      cliente: 'Manuel Medina',
      showDetails: false,
    },
    {
      id: 2,
      name: 'Collage',
      date: '21/01/2024',
      status: 1,
      rubrica: '6 puntos presentacion, 4 puntos creatividad',
      cliente: 'Pepe Peña',
      showDetails: false,
    },
    // Otros objetos de ejemplo
  ];

  toggleStatus(index: number) {
    this.data[index].status =
      (this.data[index].status + 1) % this.statusOptions.length; // Cambia el estado cíclicamente
  }

  toggleDetails(index: number) {
    this.data[index].showDetails = !this.data[index].showDetails; // Alterna la visibilidad de los detalles
  }

  // Arreglo para gestionar el estado de cada select individualmente
  statusSelections = this.data.map((item) => item.status); // Se inicializa con el estado correspondiente a cada fila

  statusOptions = [
    { value: 0, label: 'En Revisión' },
    { value: 1, label: 'Aprobada - Pago Pendiente' },
    { value: 2, label: 'En Progreso' },
    { value: 2, label: 'Finalizado' },
  ];
  performAction(index: number) {
    console.log(`Realizando acción para la fila: ${index}`);
    // Aquí puedes agregar el código para lo que desees realizar con la acción del botón
  }
  onStatusChange(index: number, value: number) {
    console.log(`Estado cambiado a: ${value} en la fila ${index}`);
    this.data[index].status = value;
  }
}
