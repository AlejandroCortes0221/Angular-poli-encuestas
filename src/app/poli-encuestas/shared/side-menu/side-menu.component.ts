import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  readonly routes: any[] = [
    {
      path: 'dashboard',
      title: 'Dashboard',
      icon: 'fa-house',
    },
    {
      path: 'settings',
      title: 'Configuraciones',
      icon: 'fa-bell',
    },
  ];

  constructor() {
    const userInfoString = sessionStorage.getItem('userInfo');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);

      const tieneModuloEmpresas = userInfo.modulos?.some(
        (mod: any) => mod.id === 1
      );

      if (tieneModuloEmpresas) {
        // Insertar como segundo elemento (índice 1)
        this.routes.splice(1, 0, {
          path: 'companies',
          title: 'Empresas',
          icon: 'fa-building',
        });
      }
    }
  }
}
