import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MaterialIconComponent } from '../material-icon/material-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/core/auth.service';
import { RoleEnum } from '../../../models/role.enum';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
  expanded?: boolean;
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
          { label: 'Tajetas', route: 'user/cards', icon: 'credit_card' },
          { label: 'Mis Pedidos', route: 'user/orders', icon: 'local_shipping' },
        ];
      case RoleEnum.MODERATOR:
        return [
          { label: 'Revisar Productos', route: 'moderator/products', icon: 'check_circle' },
          { label: 'Sanciones', route: 'moderator/sanctions', icon: 'assessment' },
        ];
      case RoleEnum.LOGISTICS:
        return [
          { label: 'Control Pedidos', route: 'logistic/orders', icon: 'local_shipping' },
        ];
      case RoleEnum.ADMINISTRATOR:
        return [
          { label: 'Usuarios', route: 'admin/users', icon: 'person_add' },
          {
            label: 'Reportes',
            icon: 'bar_chart',
            expanded: false,
            children: [
              {
                label: 'Top 10 productos más vendidos',
                route: 'admin/reports/top-products'
              },
              {
                label: 'Top 5 clientes con más ganancias',
                route: 'admin/reports/top-clients-profit'
              },
              {
                label: 'Top 5 clientes con más ventas',
                route: 'admin/reports/top-clients-sales'
              },
              {
                label: 'Top 10 clientes con más pedidos',
                route: 'admin/reports/top-clients-orders'
              },
              {
                label: 'Top 10 clientes con más productos en venta',
                route: 'admin/reports/top-clients-products'
              },
              {
                label: 'Sanciones',
                route: 'admin/reports/sanctions'
              },
              {
                label: 'Notificaciones',
                route: 'admin/reports/notifications'
              },
            ]
          }
        ];
      default:
        return [];
    }
  }

  toggleSubmenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }
}
