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
