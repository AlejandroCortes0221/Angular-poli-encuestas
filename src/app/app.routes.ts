import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./poli-encuestas/pages/login-page/login-page.component'),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
