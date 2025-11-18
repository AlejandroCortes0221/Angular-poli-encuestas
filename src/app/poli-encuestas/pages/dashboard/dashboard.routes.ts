import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { EncuestasComponent } from "./encuestas/encuestas.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";



export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'encuestas',
        component: EncuestasComponent
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'reportes',
        component: EncuestasComponent
    }
];

export default dashboardRoutes;




