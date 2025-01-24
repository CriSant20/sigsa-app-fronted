import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { PantallaGestionAdministradorComponent } from './Pages/pantalla-gestion-administrador/pantalla-gestion-administrador.component';
import { PrincipalCliente } from './Pages/principal-cliente/principal-cliente.component';

export const routes: Routes = [
  // Ruta para el login
  { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'subir', component: SubirComprobanteComponent },
  { path: 'principal-cliente', component: PrincipalCliente },
  { path: 'admin', component: PantallaGestionAdministradorComponent },
  { path: 'tareas', component: GestionAdministradorTareasComponent },
  { path: 'encuestas', component: VistaAdministradorEncuestasComponent },
];
