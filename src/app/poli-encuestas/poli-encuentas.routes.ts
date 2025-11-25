import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ConfiguracionesComponent } from './pages/configuraciones/configuraciones.component';
import { HomeComponent } from './pages/home/home.component';

export const poliEncuentasRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        data: {
          icon: 'fa-house',
        },
        component: DashboardComponent,
      },
      {
        path: 'companies',
        title: 'Empresas',
        data: {
          icon: 'fa-building',
        },
        component: EmpresasComponent,
      },
      {
        path: 'settings',
        title: 'Configuraciones',
        data: {
          icon: 'fa-bell',
        },
        component: ConfiguracionesComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

export default poliEncuentasRoutes;
