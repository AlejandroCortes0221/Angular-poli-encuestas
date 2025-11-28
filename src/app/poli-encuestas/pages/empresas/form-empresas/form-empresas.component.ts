import { EmpresaService } from '../../../services/empresa.service';
import { Component, inject, signal, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { LoadingComponent } from "../../../../shared/loading/loading.component";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-empresas',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-empresas.component.html',
  styleUrl: './form-empresas.component.css',
})
export class FormEmpresasComponent {
  private fb = inject(FormBuilder);
  private empresaService = inject(EmpresaService);
  private dialogRef = inject(MatDialogRef<FormEmpresasComponent>);
  originalEmpresas: any[] = [];


  // Recibir datos para edición
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    nit: [0, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  readonly errorField = (field: string) =>
    !!(this.myForm.get(field)?.touched && this.myForm.get(field)?.errors);

  ngOnInit(): void {
    // Si viene data, es EDITAR → llenar formulario
    if (this.data) {
      this.myForm.patchValue({
        name: this.data.nombre,
        nit: this.data.nit,
        email: this.data.correo,
      });
    }

    this.originalEmpresas = JSON.parse(JSON.stringify(this.myForm.value));
  }


  mostrarPopup(type: 'success' | 'error' | 'loading', message: string) {
    // reset para que Angular detecte cambios
    this.popupType = '';
    this.popupMessage.set('');

    setTimeout(() => {
      this.popupType = type;
      this.popupMessage.set(message);
    }, 0);
  }

  hayCambiosEmpresas(): boolean {
    return JSON.stringify(this.originalEmpresas) !== JSON.stringify(this.myForm.value);
  }

  submit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.hayCambiosEmpresas()) {
      this.mostrarPopup('error', 'No hay cambios en la empresa');
      return;
    }

    const { name = '', nit = 0, email = '' } = this.myForm.value;

    const payload = {
      nombre: name,
      nit: nit,
      correo: email,
    };

    this.loading.set(true);

    // ============================
    //        MODO EDITAR
    // ============================
    if (this.data) {
      this.popupType = 'loading';
      this.popupMessage.set('Actualizando Empresa...');

      this.empresaService
        .updateEmpresa(this.data.id, payload)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.popupType = 'success';
            this.popupMessage.set('Empresa Actualizada');
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.popupType = 'error';
            this.popupMessage.set(err.error.message);
          },
        });

      return;
    }

    // ============================
    //        MODO CREAR
    // ============================
    this.popupType = 'loading';
    this.popupMessage.set('Creando Empresa...');

    this.empresaService
      .PostEmpresa(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.popupType = 'success';
          this.popupMessage.set('Empresa Creada');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage.set(err.error.message);
        },
      });
  }
}
