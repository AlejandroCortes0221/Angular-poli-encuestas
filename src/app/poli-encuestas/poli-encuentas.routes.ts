import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ConfiguracionesComponent } from './pages/configuraciones/configuraciones.component';
import { HomeComponent } from './layout/home/home.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const poliEncuentasRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'companies',
        title: 'Empresas',
        component: EmpresasComponent,
      },
      {
        path: 'settings',
        title: 'Configuraciones',
        component: ConfiguracionesComponent,
      },
      {
        path: 'formularios',
        title: 'Encuestas',
        component: EncuestasComponent,
      },
      {
        path: 'usuarios',
        title: 'Usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'reportes',
        title: 'Reportes',
        component: ReportesComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

export default poliEncuentasRoutes;
