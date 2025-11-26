import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormEmpresasComponent } from './form-empresas/form-empresas.component';
import { EmpresaService } from '../../services/empresa.service';
@Component({
  selector: 'app-empresas',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {
  readonly dialog = inject(MatDialog);
  private empresaService = inject(EmpresaService);


  // Puedes usar signal para manejo reactivo
  empresas = signal<any[]>([]);

   ngOnInit(): void {
    this.cargarEmpresas();
  }


  cargarEmpresas() {
    this.empresaService.getEmpresa().subscribe({
      next: (res) => {
        this.empresas.set(res);
      },
      error: (err) => {
        console.error('Error cargando empresas', err);
      }
    });
  }

  eliminarEmpresa(id: number) {
    if (!confirm("¿Seguro que deseas eliminar esta empresa?")) return;
    this.empresaService.deleteEmpresa(id).subscribe({
      next: () => {
        // Recargar la lista
        this.cargarEmpresas();
      },
      error: (err) => {
        console.error("Error eliminando empresa", err);
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
