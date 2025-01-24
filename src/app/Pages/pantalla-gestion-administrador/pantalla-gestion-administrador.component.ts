import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CardsComponent } from '../../Components/cards/cards.component';
import { CardsService } from './cards.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pantalla-gestion-administrador',
  imports: [FooterComponent, MenuComponent, NavbarComponent, CardsComponent,CommonModule],
  templateUrl: './pantalla-gestion-administrador.component.html',
  styleUrls: ['./pantalla-gestion-administrador.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PantallaGestionAdministradorComponent implements OnInit {

  cards: any[] = []; // Array para almacenar las tarjetas
  priorityOrder: string[] = [
    'En Revisión',
    'Aprobada',
    'En progreso',
    'Finalizado',
    'Rechazada',
    'Cancelada',
  ]; // Orden de prioridad

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe((data) => {
      this.cards = data; // Asigna los datos de la API al array
    });
  }

  /**
   * Ordena las tarjetas según el estado en base a la prioridad definida.
   */
  private sortCardsByPriority(cards: any[]): any[] {
  return cards.sort((a, b) => {
    // Orden por estado
    const indexA = this.priorityOrder.indexOf(a.estado);
    const indexB = this.priorityOrder.indexOf(b.estado);

    if (indexA !== indexB) {
      // Si los estados son diferentes, ordena por el índice del estado
      return indexA - indexB;
    }

    // Si los estados son iguales, ordena por fecha (fecha_a_realizar)
    const dateA = new Date(a.fecha_a_realizar).getTime();
    const dateB = new Date(b.fecha_a_realizar).getTime();

    return dateA - dateB; // Orden ascendente por fecha
  });
}
}
