import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { PrincipalAdministrador } from './domains/principal-administrador/principal-administrador.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },

    {
      path: 'principalAdministrador',
      component: PrincipalAdministrador,
    },

];
