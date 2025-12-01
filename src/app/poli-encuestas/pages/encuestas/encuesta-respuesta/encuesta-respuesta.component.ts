import { Component, inject, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service';
import { RespuestaService } from '../../../services/respuesta.service';
import { finalize } from 'rxjs';
import { LoadingComponent } from "../../../../shared/loading/loading.component";

@Component({
  selector: 'app-encuesta-respuesta',
  templateUrl: './encuesta-respuesta.component.html',
  styleUrls: ['./encuesta-respuesta.component.css'],
  standalone: true,
  imports: [FormsModule, LoadingComponent]
})
export default class EncuestaRespuestaComponent {

  private EncuestaService = inject(EncuestaService);
  private RespuestaService = inject(RespuestaService);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  titulo: string = '';
  descripcion: string = '';
  fechaCierre: string = '';

  preguntas: any[] = [];

  errores: string[] = [];

  // ============================================================
  // CARGA INICIAL DE ENCUESTA
  // ============================================================
  ngOnInit(): void {

    const idEncuesta = Number(this.route.snapshot.paramMap.get('id'));

    this.loading.set(true);
    this.EncuestaService.getEncuestaById(idEncuesta)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: res => {

          const data = JSON.parse(res.json);

          this.titulo = data.titulo;
          this.descripcion = data.descripcion;
          this.fechaCierre = data.fechaCierre;

          // Inicialización correcta de respuesta
          this.preguntas = data.preguntas.map((p: any) => ({
            ...p,
            seleccionada: '', // para tipo multiple
            respuesta: ''     // para texto
          }));
        },
        error: () => {
          alert("Error cargando la encuesta.");
        }
      });
  }



  // ============================================================
  // VALIDACIÓN (GOOGLE FORMS STYLE)
  // ============================================================
  validarPreguntas(): boolean {

    this.errores = [];

    this.preguntas.forEach((p, index) => {

      // PARA MULTIPLE (radio)
      if (p.tipo === 'multiple' && (!p.seleccionada || p.seleccionada.trim() === '')) {
        this.errores[index] = "Debes seleccionar una opción.";
      }

      // PARA TEXTO
      if (p.tipo !== 'multiple' && (!p.respuesta || p.respuesta.trim() === '')) {
        this.errores[index] = "Esta pregunta es obligatoria.";
      }
    });

    // Si hay algún error, retorno falso
    return this.errores.length === 0 || this.errores.every(e => !e);
  }



  // ============================================================
  // ENVÍO DE RESPUESTAS
  // ============================================================
  enviarRespuestas() {

    // Validar antes de enviar
    if (!this.validarPreguntas()) {
      this.popupType = 'error';
      this.popupMessage.set("Debes responder todas las preguntas.");
      return;
    }

    const idEncuesta = Number(this.route.snapshot.paramMap.get('id'));

    // Crear payload limpio
    const payload = this.preguntas.map(p => {
      if (p.tipo === 'multiple') {
        return {
          texto: p.texto,
          tipo: p.tipo,
          seleccionada: p.seleccionada
        };
      } else {
        return {
          texto: p.texto,
          tipo: p.tipo,
          respuesta: p.respuesta
        };
      }
    });

    this.loading.set(true);
    this.RespuestaService.enviarRespuestas(idEncuesta, payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.popupType = 'success';
          this.popupMessage.set(res.message || 'Respuestas enviadas correctamente');
           // Cerrar la ventana del navegador después de 1 segundo
          setTimeout(() => {
            window.close();
          }, 1000);
        },
        error: () => {
          this.popupType = 'error';
          this.popupMessage.set('Error enviando respuestas');
        }
      });
  }
}
