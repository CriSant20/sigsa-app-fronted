import { Component } from '@angular/core';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { CardsComponent } from "../../Components/cards/cards.component";
import { EncuestaComponent } from "../../Components/encuesta/encuesta.component";
@Component({
  selector: 'app-vista-administrador-encuestas',
  imports: [FooterComponent, NavbarComponent, MenuComponent, CardsComponent, EncuestaComponent],
  templateUrl: './vista-administrador-encuestas.component.html',
  styleUrl: './vista-administrador-encuestas.component.css'
})
export class VistaAdministradorEncuestasComponent {

}
