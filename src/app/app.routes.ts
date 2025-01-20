import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { PrincipalAdministrador } from './Pages/principal-administrador/principal-administrador.component';
import { PrincipalCliente } from './domains/principal-cliente/principal-cliente.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },

    {
      path: 'principalAdministrador',
      component: PrincipalAdministrador,
    },
    {
      path: 'principalCliente',
      component: PrincipalCliente,
    },
];
