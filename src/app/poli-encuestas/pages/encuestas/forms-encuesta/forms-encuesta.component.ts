import { Component, inject, signal } from '@angular/core';
import { SurveyModule } from "survey-angular-ui";
import { FormsModule } from "@angular/forms";
import "survey-core/survey-core.min.css";
import { finalize } from 'rxjs';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { UsuariosService } from '../../../services/usuarios.service';
import { EncuestaService } from '../../../services/encuesta.service';
import { FormEmpresasComponent } from '../../empresas/form-empresas/form-empresas.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-forms-encuesta',
  imports: [SurveyModule, FormsModule, LoadingComponent],
  templateUrl: './forms-encuesta.component.html',
  styleUrl: './forms-encuesta.component.css'
})
export class FormsEncuestaComponent {
  private UsuariosService = inject(UsuariosService);
  private EncuestaService = inject(EncuestaService);
  private dialogRef = inject(MatDialogRef<FormEmpresasComponent>);
  empresasUsuario = signal<any[]>([]);

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const userIdString = sessionStorage.getItem('userId');
    const userId = Number(userIdString);
    let empresa;

    this.UsuariosService.getEmpresasUsuario(userId).subscribe({
      next: (res) => {
        this.empresasUsuario.set(res);
      },
      error: (err) => {
        console.error('Error cargando Empresas', err);
      }
    });

      // Si llega "data" es EDITAR
    if (this.data) {
      this.cargarDatosEditar(this.data);
    }
  }
  
  // -------------------------
  // CAMPOS PRINCIPALES
  // -------------------------
  titulo: string = '';
  descripcion: string = '';
  Empresa: number = 0;
  fechaCierre: string = '';

  // -------------------------
  // PREGUNTAS
  // -------------------------
  preguntas: any[] = [];

  errores: string[] = [];

  // =====================================================
  // MÉTODOS
  // =====================================================

  // Crear una nueva pregunta
  agregarPregunta() {
    this.preguntas.push({
      texto: '',
      tipo: 'texto',
      opciones: ['']   // usado si es pregunta multiple
    });
  }

  // Cambiar tipo de pregunta
  cambiarTipo(pregunta: any) {
    if (pregunta.tipo === 'multiple') {
      if (!Array.isArray(pregunta.opciones)) {
        pregunta.opciones = [''];
      }
    } else {
      pregunta.opciones = [];
    }
  }

  // Agregar opción dentro de la pregunta
  agregarOpcion(pregunta: any) {
    if (!pregunta.opciones) pregunta.opciones = [];
    pregunta.opciones.push('');
  }

  // Eliminar opción
  eliminarOpcion(pregunta: any, index: number) {
    pregunta.opciones.splice(index, 1);
  }

  // Eliminar pregunta completa
  eliminarPregunta(index: number) {
    this.preguntas.splice(index, 1);
  }

  // =====================================================
  // VALIDACIONES
  // =====================================================

  validar(): boolean {
    this.errores = [];

    // Validaciones principales:
    if (!this.titulo.trim()) this.errores.push("El título es obligatorio.");
    if (!this.descripcion.trim()) this.errores.push("La descripción es obligatoria.");
    if (!this.Empresa) this.errores.push("El público objetivo es obligatorio.");
    if (!this.fechaCierre.trim()) this.errores.push("La fecha de cierre es obligatoria.");

    // Validar preguntas
    if (this.preguntas.length === 0) {
      this.errores.push("Debes agregar al menos una pregunta.");
    }

    this.preguntas.forEach((p, i) => {
      if (!p.texto.trim()) {
        this.errores.push(`La pregunta ${i + 1} no puede estar vacía.`);
      }

      if (p.tipo === 'multiple') {
        const opcionesValidas = p.opciones.filter((o: string) => o.trim() !== '');
        if (opcionesValidas.length === 0) {
          this.errores.push(`La pregunta ${i + 1} debe tener al menos una opción válida.`);
        }
      }
    });

    return this.errores.length === 0;
  }

  // =====================================================
  // GUARDAR FINAL
  // =====================================================
  guardar() {
    if (!this.validar()) {
      alert(this.errores);
      return;
    }

    const json = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      fechaCierre: this.fechaCierre,
      preguntas: this.preguntas
    };

    this.loading.set(true);

    if (this.data) {
      this.EncuestaService.updateEncuesta(this.data.id, this.Empresa, json)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.popupType = 'success';
          this.popupMessage.set('Encuesta actualizada');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage.set('Error actualizando encuesta');
        }
      });

      
    }else{
      this.EncuestaService.postEncuesta(this.Empresa, json)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.popupType = 'success';
          this.popupMessage.set('Encuesta creada');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage.set('Error Creando encuesta');
        }
      });
    }
  }

  cargarDatosEditar(encuesta: any) {
    this.titulo = encuesta.titulo;
    this.descripcion = encuesta.descripcion;
    this.fechaCierre = encuesta.json.fechaCierre;
    this.Empresa = encuesta.empresa_id;


  
    // El JSON completo
    if (encuesta.json && encuesta.json.preguntas) {
      this.preguntas = encuesta.json.preguntas;
    }
  }
}
