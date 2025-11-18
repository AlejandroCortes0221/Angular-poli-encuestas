import { Routes } from "@angular/router";
import { PrincipalComponent } from "./principal.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { ConfiguracionesComponent } from "./configuraciones/configuraciones.component";


export const principalRoutes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.routes'),
      },
      {
        path: 'empresas',
        component: EmpresasComponent
      },
      {
        path: 'configuraciones',
        component: ConfiguracionesComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

export default principalRoutes;
