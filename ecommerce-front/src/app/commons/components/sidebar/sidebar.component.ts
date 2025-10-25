import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MaterialIconComponent } from '../material-icon/material-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/core/auth.service';
import { RoleEnum } from '../../../models/role.enum';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    MaterialIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() active: boolean = false;
  items: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    this.items = this.getMenuByRole(role);
  }

  private getMenuByRole(role: number | null): MenuItem[] {
    switch(role) {
      case RoleEnum.COMMON:
        return [
          { label: 'Mis Ventas', route: 'user/my-products', icon: 'sell' },
          { label: 'Comprar', route: 'user/products', icon: 'shopping_cart' },
          { label: 'Mi Carrito', route: 'user/cart', icon: 'shopping_basket' },
          { label: 'Mis Pedidos', route: 'user/orders', icon: 'local_shipping' },
        ];
      case RoleEnum.MODERATOR:
        return [
          { label: 'Revisar Productos', route: 'moderator/revisar-productos', icon: 'check_circle' },
          { label: 'Reportes Moderación', route: 'moderator/reportes-moderacion', icon: 'assessment' },
        ];
      case RoleEnum.LOGISTICS:
        return [
          { label: 'Control Paquetes', route: 'logistics/control-paquetes', icon: 'local_shipping' },
          { label: 'Historial Entregas', route: 'logistics/historial-entregas', icon: 'history' },
        ];
      case RoleEnum.ADMINISTRATOR:
        return [
          { label: 'Usuarios', route: 'admin/users', icon: 'person_add' },
          { label: 'Generar Reportes', route: 'admin/reports', icon: 'bar_chart' },
        ];
      default:
        return [];
    }
  }
}
