import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../models/model';
import { OrderService } from '../../../../../services/core/order.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { OrderStatus } from '../../../../../models/order-status.enum';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AuthService } from '../../../../../services/core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    DatePipe,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = 'ALL';

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    const userId = this.authService.getUserId();
    if (!userId) return this.toastService.error('No hay usuario')

    this.orderService.findByUserId(userId).subscribe({
      next: data => {
        this.orders = data;
        this.filteredOrders = data;
      },
      error: () => this.toastService.error('Error del servidor')
    });
  }

  getStatusLabel(status: number): string {
    switch(status) {
      case OrderStatus.COMING: return 'En curso';
      case OrderStatus.COMPLETED: return 'Entregado';
      default: return 'Desconocido';
    }
  }

  onStatusChange(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredOrders = this.orders;
    } else {
      const statusFilter = this.selectedStatus === 'COMING' ? OrderStatus.COMING : OrderStatus.COMPLETED;
      this.filteredOrders = this.orders.filter(o => o.status === statusFilter);
    }
  }
}
