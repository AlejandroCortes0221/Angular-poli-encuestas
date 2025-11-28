import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormEmpresasComponent } from './form-empresas/form-empresas.component';
import { EmpresaService } from '../../services/empresa.service';
import { finalize } from 'rxjs';
import { LoadingComponent } from "../../../shared/loading/loading.component";
@Component({
  selector: 'app-empresas',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, LoadingComponent],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {
  readonly dialog = inject(MatDialog);
  private empresaService = inject(EmpresaService);
  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  // Puedes usar signal para manejo reactivo
  empresas = signal<any[]>([]);

   ngOnInit(): void {
    this.cargarEmpresas();
  }


  cargarEmpresas() {

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Cargando Empresas...');


    this.empresaService
    .getEmpresa()
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (res) => {
        this.empresas.set(res);
        this.popupType = '';         // opcional: limpiar popup
        this.popupMessage.set('');
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error cargando empresas');
      }
    });
  }



  eliminarEmpresa(id: number) {
    if (!confirm("¿Seguro que deseas eliminar esta empresa?")) return;

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Eliminando Empresa...');

    this.empresaService
    .deleteEmpresa(id)
    .pipe(finalize(()=> this.loading.set(true)))
    .subscribe({
      next: () => {
        // Recargar la lista
        this.cargarEmpresas();
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set(err.error.message);
        console.log(err);

      }
    });
  }

  openDialog(empresa?: any): void {
    const dialogRef = this.dialog.open(FormEmpresasComponent, {
      width: '450px',
      height: '480px',
      data: empresa ?? null
    });

    dialogRef.afterClosed().subscribe((refresh: boolean | undefined) => {
      if (refresh) {
        this.cargarEmpresas();
      }
    });
  }
}
