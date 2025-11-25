import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormEmpresasComponent } from './form-empresas/form-empresas.component';
@Component({
  selector: 'app-empresas',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {
readonly dialog = inject(MatDialog);


openDialog():void {
   const dialogRef = this.dialog.open(FormEmpresasComponent, {
    width: '450px',
    height: '480px'
   });
}
}
