import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  imports: [CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
})
export class EncuestaComponent {
  tarea = {
    atencion: 'Informe',
    Costo:'Pepe',
    Calidad: 'Excelente', // Enum: Atencion
    costo: 'Moderado', // Enum: Costo
    calidad: 'Alta', // Enum: Calidad
    fecha_a_realizar: 'Alta', // Enum: Calidad
    nota: 9.5, // Calificación o nota
  };
}
