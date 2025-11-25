import { EmpresaService } from './../../../../services/empresa.service';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingComponent } from "../../../../shared/loading/loading.component";


@Component({
  selector: 'app-form-empresas',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-empresas.component.html',
  styleUrl: './form-empresas.component.css',
})
export class FormEmpresasComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private EmpresaService = inject(EmpresaService);
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

  submit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }

    const {name = '', nit = 0, email = '' } = this.myForm.value

    this.loading.set(true);
        this.popupType = 'loading';
        this.popupMessage.set('Creando Empresa...');

        const data = {
          nombre: name,
          nit: nit,
          correo: email
        };


        this.EmpresaService
          .createEmpresa(data)
          .pipe(finalize(() => this.loading.set(false)))
          .subscribe({
            next: (res) => {
              this.popupType = 'success';
              this.popupMessage.set(`Empresa Creada`);
            },
            error: (err) => {
              this.popupType = 'error';
              this.popupMessage.set(err.error.message);
            },
          });
  }
}
