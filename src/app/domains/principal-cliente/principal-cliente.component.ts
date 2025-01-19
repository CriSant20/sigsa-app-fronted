import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'principal-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-cliente.component.html',
  styleUrls: ['./principal-cliente.component.css']
})
export class PrincipalCliente {
  showingTable: boolean = true;
  showingProfile: boolean = false;

  showTable(): void {
    this.showingTable = true;
    this.showingProfile = false;
  }

  showProfile(event: Event): void {
    event.preventDefault(); // Evita que el enlace cambie la URL
    this.showingTable = false;
    this.showingProfile = true;
  }

}