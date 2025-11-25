import { Component } from '@angular/core';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SideMenuComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
