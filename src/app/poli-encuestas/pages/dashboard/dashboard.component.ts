import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGauge } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 faGauge = faGauge;
 modules = signal([{

 }])

}
