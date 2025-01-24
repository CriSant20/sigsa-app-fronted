import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { MenuComponent } from '../../Components/menu/menu.component';
import { EncuestaComponent } from "../../Components/encuesta/encuesta.component";
import { EncuestaService1 } from './encuesta1.service';



@Component({
  selector: 'app-vista-administrador-encuestas',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, 
    FooterComponent, 
    NavbarComponent, 
    MenuComponent, 
    EncuestaComponent
  ],
  templateUrl: './vista-administrador-encuestas.component.html',
  styleUrl: './vista-administrador-encuestas.component.css'
})
export class VistaAdministradorEncuestasComponent implements OnInit {
  encuestas: any[] = [];

  constructor(private encuestaService: EncuestaService1) {}

  ngOnInit() {
    this.cargarEncuestas();
  }

  cargarEncuestas() {
    this.encuestaService.obtenerEncuestas().subscribe({
      next: (data) => {
        this.encuestas = data;
      },
      error: (error) => {
        console.error('Error al cargar encuestas', error);
      }
    });
  }
}