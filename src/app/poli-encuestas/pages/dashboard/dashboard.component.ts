import { Component, inject, OnInit, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgTemplateOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  readonly router = inject(Router);

  readonly isLoading = signal(true);

  readonly contentEncuestas = [
    {
      id: 1,
      nombre: 'Encuestas',
      total: '2',
      ruta: 'encuestas',
      btnText: 'Agregar Encuesta',
      classColor: 'bg-theme-orange',
      route: 'encuestas/formularios',
    },
    {
      id: 2,
      nombre: 'Usuarios',
      total: '4',
      ruta: 'usuarios',
      btnText: 'Ver Usuarios',
      classColor: 'bg-theme-pink',
      route: 'encuestas/usuarios',
    },
    {
      id: 3,
      nombre: 'Reportes',
      total: '2',
      ruta: 'reportes',
      btnText: 'Ver Reportes',
      classColor: 'bg-theme-purple',
      route: 'encuestas/reportes',
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }
}
