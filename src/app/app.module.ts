import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalCliente } from './Pages/principal-cliente/principal-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalCliente
  ],
  imports: [
    BrowserModule,
    CommonModule,  // Asegúrate de que CommonModule esté importado
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }