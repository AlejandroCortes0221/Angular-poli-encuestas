import { Component, inject, signal } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { FormsEncuestaComponent } from './forms-encuesta/forms-encuesta.component';
import { ReporteEncuestaComponent } from './reporte-encuesta/reporte-encuesta.component';


@Component({
  selector: 'app-encuestas',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './encuestas.component.html',
  styleUrl: './encuestas.component.css'
})
export class EncuestasComponent {
  private encuestaService = inject(EncuestaService);
  encuestas = signal<any[]>([]);
  readonly dialog = inject(MatDialog);
  userId!: number;

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  constructor() {
    const userIdString = sessionStorage.getItem('userId');
    this.userId = Number(userIdString);
  }

  ngOnInit(): void {
    this.cargarEncuestas();
  }


  cargarEncuestas() {
    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Cargando Encuestas...');


    this.encuestaService
    .getEncuestasPorUsuario(this.userId)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (res) => {
        this.encuestas.set(res);        
        this.popupType = '';         // opcional: limpiar popup
        this.popupMessage.set('');
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error cargando Encuestas');
      }
    });
  }

  openDialog(encuesta?: any): void {
    const dialogRef = this.dialog.open(FormsEncuestaComponent, {
      width: '90vw',
      height: '580px',
      maxWidth: '90vw',
      data: encuesta ?? null
    });

    dialogRef.afterClosed().subscribe((refresh: boolean | undefined) => {
      if (refresh) {
        this.cargarEncuestas();
      }
    });
  }

  openDialogReporte(reporte?: any): void {
    const dialogRef = this.dialog.open(ReporteEncuestaComponent, {
      width: '50vw',
      height: '580px',
      maxWidth: '90vw',
      data: reporte ?? null
    });
  }

  eliminarEncuesta(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta encuesta?')) return;

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Eliminando Encuesta...');

    this.encuestaService
    .deleteEncuesta(id)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: () => {
        this.popupType = 'success';
        this.popupMessage.set('Encuesta Eliminado');
        this.cargarEncuestas(); // refrescar lista
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error Eliminando Encuesta');
      }
    });
  }
}
