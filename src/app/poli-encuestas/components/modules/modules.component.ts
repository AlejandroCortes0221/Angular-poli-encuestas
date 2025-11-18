import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-modules',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
  @Input() nombre!: string;
  @Input() icon!: IconDefinition;
  @Input() total!: string;
  @Input() ruta!: string;
}
