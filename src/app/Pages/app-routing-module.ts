import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalCliente } from './principal-cliente/principal-cliente.component';

const routes: Routes = [
  { path: 'principalAdministrador', component: PrincipalCliente },
  { path: '', redirectTo: '/principalAdministrador', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }