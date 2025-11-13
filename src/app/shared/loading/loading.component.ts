import { Component, effect, input, signal } from '@angular/core';
import { NgClass } from '@angular/common'; //

@Component({
  selector: 'loading',
  imports: [NgClass],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  message = input<string>('');
  type = input<'loading' | 'error' | 'success' | ''>('');

  visible = signal(true);

  constructor() {
    // 🔹 Cuando cambia el tipo desde el padre, el popup se vuelve visible otra vez
    effect(() => {
      if (this.type()) {
        this.visible.set(true);
      }
    });
  }

  close() {
    this.visible.set(false);
  }

}
