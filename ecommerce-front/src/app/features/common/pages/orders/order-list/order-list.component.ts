import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../models/model';
import { OrderService } from '../../../../../services/core/order.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { OrderStatus } from '../../../../../models/order-status.enum';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.orderService.findAll().subscribe({
      next: data => this.orders = data,
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

}
