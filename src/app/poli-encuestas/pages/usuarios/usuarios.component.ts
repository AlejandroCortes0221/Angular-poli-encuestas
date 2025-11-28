import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsUserComponent } from './forms-user/forms-user.component';
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  imports: [LoadingComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  private usuariosService = inject(UsuariosService);
  usuarios = signal<any[]>([]);
  readonly dialog = inject(MatDialog);

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  ngOnInit(): void {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Cargando Usuarios...');


    this.usuariosService
    .getUsuario()
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (res) => {
        this.usuarios.set(res);
        this.popupType = '';         // opcional: limpiar popup
        this.popupMessage.set('');
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error cargando Usuarios');
      }
    });
  }

  openDialog(usuario?: any): void {
    const dialogRef = this.dialog.open(FormsUserComponent, {
      width: '1000px',
      height: '580px',
      maxWidth: '90vw',
      data: usuario ?? null
    });

    dialogRef.afterClosed().subscribe((refresh: boolean | undefined) => {
      if (refresh) {
        this.cargarUsuarios();
      }
    });
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Eliminando Usuario...');

    this.usuariosService
    .eliminarUsuario(id)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: () => {
        this.popupType = 'success';
        this.popupMessage.set('Usuario Eliminado');
        this.cargarUsuarios(); // refrescar lista
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error Eliminando Usuario');
      }
    });
  }

}
