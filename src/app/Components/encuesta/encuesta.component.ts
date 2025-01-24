import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  imports: [NgIf, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
})
export class EncuestaComponent {
  tarea = {
    Tarea: 'Informe',
    Cliente:'Pepe',
    atencion: 'Excelente', // Enum: Atencion
    costo: 'Moderado', // Enum: Costo
    calidad: 'Alta', // Enum: Calidad
    nota: 9.5, // Calificación o nota
  };
}
