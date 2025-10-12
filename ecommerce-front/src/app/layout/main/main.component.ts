import { Component } from '@angular/core';
import { HeaderComponent } from '../../commons/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../commons/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  sidebarStatus: boolean = false;

  constructor() {
  }
}
