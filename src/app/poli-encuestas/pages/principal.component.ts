import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionsComponent } from "../components/options/options.component";
import { faGauge, faBuilding, faCog } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, OptionsComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  options = signal([
    {
      id: 1,
      nombre: "Dashboard",
      ruta: '/principal/dashboard',
      icon: faGauge
    },
    {
      id: 2,
      nombre: "Empresas",
      ruta: '/principal/empresas',
      icon: faBuilding
    },
    {
      id: 3,
      nombre: "Configuraciones",
      ruta: '/principal/configuraciones',
      icon: faCog
    }
  ])
}
