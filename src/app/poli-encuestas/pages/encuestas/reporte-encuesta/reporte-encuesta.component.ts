import { Component, Inject, inject, signal } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RespuestaService } from '../../../services/respuesta.service';
import { finalize } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingComponent } from "../../../../shared/loading/loading.component";

@Component({
  selector: 'app-reporte-encuesta',
  templateUrl: './reporte-encuesta.component.html',
  styleUrls: ['./reporte-encuesta.component.css'],
  imports: [LoadingComponent]
})
export class ReporteEncuestaComponent {
  private RespuestaService = inject(RespuestaService);

  loading = signal(false);
  popupMessage = signal('');
  popupType: 'loading' | 'error' | 'success' | '' = '';

  // JSON de respuestas ya parseadas
  respuestas = signal<any[][]>([]);

  // Reporte procesado
  reporte = signal<any[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (!this.data || !this.data.id) return;

    const idEncuesta = this.data.id; // <-- ahora es dinámico

    this.loading.set(true);
    this.RespuestaService.getRespuestasById(idEncuesta)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any[]) => {

          if (!res || res.length === 0) {
            this.popupType = 'error';
            this.popupMessage.set('Esta encuesta aún no tiene respuestas.');
            return;
          }
          // parsear cada json de respuesta
          const respuestasParseadas: any[][] = res.map(r => JSON.parse(r.json));
          this.respuestas.set(respuestasParseadas);

          // generar reporte resumido
          this.generarReporte();
        },
        error: () => {
          alert("Error cargando la encuesta.");
        }
      });
  }

  generarReporte() {
    const todasRespuestas = this.respuestas();
    if (!todasRespuestas || todasRespuestas.length === 0) return;

    const preguntas = todasRespuestas[0];
    const reporteTemp: any[] = [];

    for (const pregunta of preguntas) {
      const item: any = { texto: pregunta.texto, tipo: pregunta.tipo, respuestas: [] };

      // recolectar todas las respuestas de todos los usuarios
      for (const resp of todasRespuestas) {
        const r = resp.find(r => r.texto === pregunta.texto);
        if (r) {
          if (pregunta.tipo === 'multiple') item.respuestas.push(r.seleccionada);
          else item.respuestas.push(r.respuesta);
        }
      }

      // opción múltiple: calcular la opción más usada
      if (pregunta.tipo === 'multiple') {
        const counts: Record<string, number> = {};
        for (const r of item.respuestas) counts[r] = (counts[r] || 0) + 1;

        let maxCount = 0;
        let masUsada = '';
        for (const key in counts) {
          if (counts[key] > maxCount) {
            maxCount = counts[key];
            masUsada = key;
          }
        }
        item.masUsada = masUsada;
      }

      reporteTemp.push(item);
    }

    this.reporte.set(reporteTemp);
  }

  descargarCSV() {
    const data = this.reporte();
    if (!data.length) return;

    let csv = 'Pregunta,Tipo,Respuestas,Respuesta más usada\n';

    for (const p of data) {
      if (p.tipo === 'multiple') {
        csv += `"${p.texto}","${p.tipo}","${p.respuestas.join('; ')}","${p.masUsada}"\n`;
      } else {
        csv += `"${p.texto}","${p.tipo}","${p.respuestas.join(' | ')}","\n`;
      }
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte_totalizado.csv';
    link.click();
  }

  descargarPDF() {
    const data = this.reporte();
    if (!data.length) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de la Encuesta', 14, 20);

    const tableData: any[] = [];

    for (const p of data) {
      if (p.tipo === 'multiple') {
        tableData.push([p.texto, p.tipo, p.respuestas.join(', '), p.masUsada]);
      } else {
        tableData.push([p.texto, p.tipo, p.respuestas.join(' | '), '']);
      }
    }

    autoTable(doc, {
      head: [['Pregunta', 'Tipo', 'Respuestas', 'Más usada']],
      body: tableData,
      startY: 30,
      theme: 'grid'
    });

    doc.save('reporte_encuesta.pdf');
  }
}
