import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'principal-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-administrador.component.html',
  styleUrls: ['./principal-administrador.component.css']
})
export class PrincipalAdministrador {
  showingTable: boolean = true;
  showingProfile: boolean = false;

  showTable(): void {
    this.showingTable = true;
    this.showingProfile = false;
  }

  showProfile(): void {
    this.showingTable = false;
    this.showingProfile = true;
  }

  closeProfile(): void {
    this.showingProfile = false;
    this.showingTable = true;
  }
}