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

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe((data) => {
      this.cards = data; // Asigna los datos de la API al array
    });
  }
}
