import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modules',
  imports: [RouterLink],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css',
})
export class ModulesComponent {
  @Input() nombre!: string;
  @Input() icon!: any;
  @Input() total!: string;
  @Input() ruta!: string;
}
