import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import poliEncuentasRoutes from '../../poli-encuentas.routes';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  readonly routes = [
    {
      path: 'dashboard',
      title: 'Dashboard',
      icon: 'fa-house',
    },
    {
      path: 'companies',
      title: 'Empresas',
      icon: 'fa-building',
    },
    {
      path: 'settings',
      title: 'Configuraciones',
      icon: 'fa-bell',
    },
  ];

  // readonly routes =
  //   poliEncuentasRoutes[0].children
  //     ?.map((route) => ({
  //       name: (route?.title ?? '') as string,
  //       path: (route?.path ?? '') as string,
  //       icon: route?.data?.['icon'],
  //     }))
  //     .filter((route) => route.name !== '') || [];
}
