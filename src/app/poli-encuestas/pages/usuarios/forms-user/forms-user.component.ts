import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormEmpresasComponent } from '../../empresas/form-empresas/form-empresas.component';
import { LoadingComponent } from "../../../../shared/loading/loading.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forms-user',
  imports: [ReactiveFormsModule, LoadingComponent, FormsModule],
  templateUrl: './forms-user.component.html',
  styleUrl: './forms-user.component.css'
})
export class FormsUserComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<FormEmpresasComponent>);
  rolesUsuario = signal<any[]>([]);
  empresasUsuario = signal<any[]>([]);
  rolesList: any[] = [];
  originalRoles: any[] = [];
  originalEmpresas: any[] = [];
  originalUsuario: any = {};


  private UsuariosService = inject(UsuariosService);

  // Recibir datos para edición
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  myFormRoles: FormGroup = this.fb.group({
    activo: ['', [Validators.required]]
  });

   myFormEmpresa: FormGroup = this.fb.group({
    activo: ['', [Validators.required]]
  });

  myForm: FormGroup = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    activo: [false]
});

  readonly errorField = (field: string) =>
    !!(this.myForm.get(field)?.touched && this.myForm.get(field)?.errors);

  ngOnInit(): void {
    // Si viene data, es EDITAR → llenar formulario
    if (this.data) {
      this.myForm.patchValue({
        nombres: this.data.nombres,
        apellidos: this.data.apellidos,
        email: this.data.correo,
        activo: this.data.activo,
      });

      this.originalUsuario = JSON.parse(JSON.stringify(this.myForm.value));
    }

    this.cargarRolesUsuarios();
    this.cargarEmpresasUsuarios();
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

  cargarRolesUsuarios() {
    this.UsuariosService.getRolesUsuario(this.data.id).subscribe({
      next: (res) => {
        this.rolesUsuario.set(res);
         // Guardar copia original
        this.originalRoles = JSON.parse(JSON.stringify(res));
      },
      error: (err) => {
        console.error('Error cargando Roles', err);
      }
    });
  }


  cargarEmpresasUsuarios() {
    this.UsuariosService.getEmpresasUsuario(this.data.id).subscribe({
      next: (res) => {
        this.empresasUsuario.set(res);

        // Guardar copia original
        this.originalEmpresas = JSON.parse(JSON.stringify(res));
      },
      error: (err) => {
        console.error('Error cargando Empresas', err);
      }
    });
  }

  hayCambiosRoles(): boolean {
    return JSON.stringify(this.rolesUsuario()) !== JSON.stringify(this.originalRoles);
  }

  hayCambiosEmpresas(): boolean {
    return JSON.stringify(this.empresasUsuario()) !== JSON.stringify(this.originalEmpresas);
  }

  hayCambiosUsuario(): boolean {
    return JSON.stringify(this.originalUsuario) !== JSON.stringify(this.myForm.value);
  }

  toggle(data: any, event: Event) {
    data.activo = (event.target as HTMLInputElement).checked;
  }


  submitRol(): void {
    if (!this.hayCambiosRoles()) {
      this.mostrarPopup('error', 'No hay cambios en roles');
      return;
    }

    const usuarioId = this.data.id;

    const rolesPayload = this.rolesUsuario().map(r => ({
      id: r.id,
      activo: r.activo ? 1 : 0
    }));

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Actualizando roles...');


    this.UsuariosService.actualizarRoles(usuarioId, rolesPayload)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (res) => {
        this.popupType = 'success';
        this.popupMessage.set('Roles actualizados correctamente');

        // Actualizar copia original
        this.originalRoles = JSON.parse(JSON.stringify(this.rolesUsuario()));
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error actualizando roles');
      }
    });
  }

  submitEmpresa(): void {

    if (!this.hayCambiosEmpresas()) {
      this.mostrarPopup('error', 'No hay cambios en empresas');
      return;
    }

   const usuarioId = this.data.id;

    const empresasPayload = this.empresasUsuario().map(r => ({
      id: r.id,
      activo: r.activo ? 1 : 0
    }));

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Actualizando Empresas...');

    this.UsuariosService.actualizarEmmpresas(usuarioId, empresasPayload)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (res) => {
        this.popupType = 'success';
        this.popupMessage.set('Empresas actualizadas correctamente');

        // Actualizar copia original
        this.originalEmpresas = JSON.parse(JSON.stringify(this.empresasUsuario()));
      },
      error: (err) => {
        this.popupType = 'error';
        this.popupMessage.set('Error actualizando empresas');
      }
    });
  }

  submit(): void {

    const { nombres, apellidos, email} = this.myForm.value;

    if (!nombres || !apellidos || !email) {
      this.mostrarPopup('error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (!this.hayCambiosUsuario()) {
      this.mostrarPopup('error', 'No hay cambios en el usuario');
      return;
    }

    const payload = this.myForm.value;
    const id = this.data.id; // AQUÍ VA EL ID QUE ENVÍAS

    this.loading.set(true);
    this.mostrarPopup('loading', 'Actualizando Usuario...');

    this.UsuariosService.updateUsuario(id, payload)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: () => {
        this.mostrarPopup('success', 'Usuario Actualizado');

        // Actualizar copia original
        this.originalUsuario = JSON.parse(JSON.stringify(this.myForm.value));

        // 🔹 Cerrar diálogo y avisar que se hizo refresh
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.mostrarPopup('error', err.error.message ?? 'Error actualizando usuario');
      }
    });
  }
}
