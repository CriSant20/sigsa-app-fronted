import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalAdministrador } from './Pages/principal-administrador/principal-administrador.component';

const routes: Routes = [
  { path: 'principalAdministrador', component: PrincipalAdministrador },
  { path: '', redirectTo: '/principalAdministrador', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
