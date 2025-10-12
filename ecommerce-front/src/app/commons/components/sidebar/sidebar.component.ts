import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MaterialIconComponent } from '../material-icon/material-icon.component';
import { RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    NgClass,
    MaterialIconComponent,
    RouterLink
  ],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() active: boolean = false;
  userRole: string = 'Común';

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = this.getMenuByRole(this.userRole);
  }

  private getMenuByRole(role: string): MenuItem[] {
    switch(role) {
      case 'Común':
        return [
          { label: 'Mis Ventas', route: '/mis-ventas', icon: 'sell' },
          { label: 'Comprar', route: '/comprar', icon: 'shopping_cart' },
        ];
      case 'Moderador':
        return [
          { label: 'Revisar Productos', route: '/revisar-productos', icon: 'check_circle' },
          { label: 'Reportes Moderación', route: '/reportes-moderacion', icon: 'assessment' },
        ];
      case 'Logística':
        return [
          { label: 'Control Paquetes', route: '/control-paquetes', icon: 'local_shipping' },
          { label: 'Historial Entregas', route: '/historial-entregas', icon: 'history' },
        ];
      case 'Administrador':
        return [
          { label: 'Registrar Usuarios', route: '/registrar-usuarios', icon: 'person_add' },
          { label: 'Generar Reportes', route: '/reportes', icon: 'bar_chart' },
        ];
      default:
        return [];
    }
  }
}
