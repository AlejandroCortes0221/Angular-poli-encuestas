import { Component, signal } from '@angular/core';

import { ModulesComponent } from '../../components/modules/modules.component';

@Component({
  selector: 'app-dashboard',
  imports: [ModulesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // faGauge = faGauge;
  // modules = signal([
  //   {
  //     id: 1,
  //     nombre: "Encuestas",
  //     icon: faFile,
  //     total: "2 Registradas",
  //     ruta: "encuestas"
  //   },
  //   {
  //     id: 2,
  //     nombre: "Usuarios",
  //     icon: faUser,
  //     total: "4 Registrados",
  //     ruta: "usuarios"
  //   },
  //   {
  //     id: 3,
  //     nombre: "Reportes",
  //     icon: faChartBar,
  //     total: "2 Disponibles",
  //     ruta: "reportes"
  //   }
  // ])
}
