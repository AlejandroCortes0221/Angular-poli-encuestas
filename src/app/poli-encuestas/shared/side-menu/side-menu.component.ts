import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import poliEncuentasRoutes from '../../poli-encuentas.routes';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  readonly routes =
    poliEncuentasRoutes[0].children
      ?.map((route) => ({
        name: (route?.title ?? '') as string,
        path: (route?.path ?? '') as string,
        icon: route?.data?.['icon'],
      }))
      .filter((route) => route.name !== '') || [];

  constructor() {
    console.log(this.routes);
  }
}
