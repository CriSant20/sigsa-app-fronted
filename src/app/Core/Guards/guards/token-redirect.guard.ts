import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';

export const tokenRedirectGuard: CanActivateFn = (route, state) => {
  const currentUrl = state.url;

  // Verificar si la URL comienza con '?token='
  if (currentUrl.includes('?token=')) {
    const router = inject(Router); // Inyectar el servicio Router
    router.navigate(['/principal-cliente']); // Redirigir a la página principal-cliente
    return false; // Bloquea el acceso a la ruta actual
  }

  return true; // Permitir el acceso si no se cumple la condición
};
