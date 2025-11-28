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
      classColor: 'bg-[#2862e15f]',
      route: 'encuestas/formularios',
    },
    {
      id: 2,
      nombre: 'Usuarios',
      total: '4',
      ruta: 'usuarios',
      btnText: 'Ver Usuarios',
      classColor: 'bg-[#2862e15f]',
      route: 'encuestas/usuarios',
    },
    {
      id: 3,
      nombre: 'Reportes',
      total: '2',
      ruta: 'reportes',
      btnText: 'Ver Reportes',
      classColor: 'bg-[#2862e15f]',
      route: 'encuestas/reportes',
    },
  ];

  ngOnInit(): void {
    this.isLoading.set(false);
  }
}
