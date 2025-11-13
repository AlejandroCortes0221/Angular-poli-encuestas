import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";


export const authRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

export default authRoutes;
