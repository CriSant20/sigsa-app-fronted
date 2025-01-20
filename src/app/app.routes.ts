import { Routes } from '@angular/router';
//import { LoginComponent } from './Pages/login/login.component';
import { PantallaGestionAdministradorComponent } from './Pages/pantalla-gestion-administrador/pantalla-gestion-administrador.component';
import { GestionAdministradorTareasComponent } from './Pages/gestion-administrador-tareas/gestion-administrador-tareas.component';
export const routes: Routes = [
   // { path: 'login', component: LoginComponent },
   { path: '', redirectTo: 'admin', pathMatch: 'full' },
   { path: 'admin', component: PantallaGestionAdministradorComponent },
   { path: 'tareas', component: GestionAdministradorTareasComponent }
];
