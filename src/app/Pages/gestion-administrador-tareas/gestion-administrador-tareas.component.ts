import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-gestion-administrador-tareas',
  imports: [FooterComponent, MenuComponent, NavbarComponent, CommonModule, NgClass],
  templateUrl: './gestion-administrador-tareas.component.html',
  styleUrl: './gestion-administrador-tareas.component.css',
  standalone: true,
})
export class GestionAdministradorTareasComponent {
  data = [
    { id: 1, name: 'Tarea 1', status: true, showDetails: false, email: 'test1@example.com', phone: '123456789' },
    { id: 2, name: 'Tarea 2', status: false, showDetails: false, email: 'test2@example.com', phone: '987654321' },
    { id: 3, name: 'Tarea 3', status: true, showDetails: false, email: 'test3@example.com', phone: '456789123' }
  ];

  toggleStatus(index: number) {
    this.data[index].status = !this.data[index].status;
  }

  toggleDetails(index: number) {
    this.data[index].showDetails = !this.data[index].showDetails;
  }
}
