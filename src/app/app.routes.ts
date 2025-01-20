import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },

    { path: 'registro', component: RegistroComponent },

];
