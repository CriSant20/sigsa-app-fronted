import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { PrincipalCliente } from './Pages/principal-cliente/principal-cliente.component';


export const routes: Routes = [

    { path: 'login', component: LoginComponent },

    {
        path: 'principalCliente',
        component: PrincipalCliente,
      },

];
