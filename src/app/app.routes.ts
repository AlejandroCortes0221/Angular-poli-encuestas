import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'encuestas',
    loadChildren: () => import('./poli-encuestas/poli-encuentas.routes'),
  },
  {
    path: 'respuesta/:id',
    loadComponent: () => import('./poli-encuestas/pages/encuestas/encuesta-respuesta/encuesta-respuesta.component'),
  },
  // {
  //   path: 'principal',
  //   loadChildren: () => import('./poli-encuestas/pages/principal.routes'),
  // },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
