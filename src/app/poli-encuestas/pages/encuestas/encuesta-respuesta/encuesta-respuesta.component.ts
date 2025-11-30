import { Component, inject, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service';

@Component({
  selector: 'app-encuesta-respuesta',
  templateUrl: './encuesta-respuesta.component.html',
  styleUrls: ['./encuesta-respuesta.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export default class EncuestaRespuestaComponent {
  private EncuestaService = inject(EncuestaService);
  private route = inject(ActivatedRoute);
  empresasUsuario = signal<any[]>([]);

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';
  

  
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


  ngOnInit(): void {
    const userIdString = sessionStorage.getItem('userId');
    const userId = Number(userIdString);
    const id = Number(this.route.snapshot.paramMap.get('id'));


    this.EncuestaService.getEncuestaById(id).subscribe({
      next: (res) => {
        const jsonData = JSON.parse(res.json);
        this.titulo = jsonData.titulo;
        this.descripcion = jsonData.descripcion;
        this.fechaCierre = jsonData.fechaCierre;

        // El JSON completo
        this.preguntas = jsonData.preguntas;

        console.log(jsonData);
        
        this.loading.set(false);
      },
      error: () => {
        alert('Error cargando encuesta');
        this.loading.set(false);
      }
    });

    // this.titulo = encuesta.titulo;
    // this.descripcion = encuesta.descripcion;
    // this.fechaCierre = encuesta.json.fechaCierre;
    // this.Empresa = encuesta.empresa_id;


  
    // // El JSON completo
    // if (encuesta.json && encuesta.json.preguntas) {
    //   this.preguntas = encuesta.json.preguntas;
    // }
  }

}
