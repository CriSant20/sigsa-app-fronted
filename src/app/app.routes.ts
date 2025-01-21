import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { PrincipalCliente } from './Pages/principal-cliente/principal-cliente.component';
import { RegistroComponent } from './Pages/registro/registro.component';


export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },

    {
        path: 'principalCliente',
        component: PrincipalCliente,
      },

];
