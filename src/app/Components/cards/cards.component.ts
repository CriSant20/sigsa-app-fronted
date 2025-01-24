import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-cards',
  imports: [NgIf, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  standalone:true,
})
export class CardsComponent {
/*   // Ejemplo de datos recibidos del backend
  card = {
    nombre: 'Informe de Rendimiento',
    tipo_tarea: 'Análisis',
    indicaciones: 'Completar el informe con datos recientes',
    rubrica: '3 puntos presentación, 4 puntos contenido',
    estado: 1,
    fecha_a_realizar: new Date('2025-01-30'),
  }; */

  @Input() tarea: any; // Recibe datos desde el componente padre
  // Método para generar clases dinámicas según el estado
  getEstadoClase(): string {
    // Convierte el estado a minúsculas, reemplaza espacios con guiones y elimina caracteres especiales
    return this.tarea?.estado
      ?.toLowerCase()
      ?.replace(/\s+/g, '-')
      ?.replace(/[^a-z0-9\-]/g, '') || '';
  }
}
