import { Component, Input, input } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-options',
  imports: [RouterLink],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
})
export class OptionsComponent {
  @Input() nombre!: string;
  @Input() icon!: any;
  @Input() ruta!: string;
}
