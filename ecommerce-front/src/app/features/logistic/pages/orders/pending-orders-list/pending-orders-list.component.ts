import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../models/model';
import { OrderService } from '../../../../../services/core/order.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { OrderStatus } from '../../../../../models/order-status.enum';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pending-orders-list',
  imports: [
    DatePipe,
    DecimalPipe,
    ListPageHeaderComponent,
    TableRowActionComponent,
    FormsModule
  ],
  templateUrl: './pending-orders-list.component.html',
  styleUrl: './pending-orders-list.component.scss'
})
export class PendingOrdersListComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = 'ALL';

  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.orderService.findAll().subscribe({
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
