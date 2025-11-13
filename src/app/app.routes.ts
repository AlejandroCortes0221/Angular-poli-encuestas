import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./poli-encuestas/pages/login-page/login-page.component'),
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./poli-encuestas/pages/dashboard.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
