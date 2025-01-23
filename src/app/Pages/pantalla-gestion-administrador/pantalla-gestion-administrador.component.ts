import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CardsComponent } from '../../Components/cards/cards.component';
@Component({
  selector: 'app-pantalla-gestion-administrador',
  imports: [FooterComponent, MenuComponent, NavbarComponent, CardsComponent],
  templateUrl: './pantalla-gestion-administrador.component.html',
  styleUrls: ['./pantalla-gestion-administrador.component.css'],
  standalone:true,
})
export class PantallaGestionAdministradorComponent {}
