import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../../services/core/order.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { OrderStatus } from '../../../../../models/order-status.enum';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
  DetailPageHeaderComponent
} from '../../../../../commons/components/detail-page-header/detail-page-header.component';
import { ViewFieldComponent } from '../../../../../commons/components/view-field/view-field.component';

@Component({
  selector: 'app-order-detail',
  imports: [
    DecimalPipe,
    DetailPageHeaderComponent,
    ViewFieldComponent,
    DatePipe
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  orderId!: number;
  order: Order = new Order();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('id'));
      if (!this.orderId) return;
      this.loadOrder();
    });
  }

  loadOrder() {
    this.orderService.findById(this.orderId).subscribe({
      next: data => this.order = data,
      error: err => {
        this.toastService.error('Error al cargar la orden');
        void this.router.navigate(['/user/orders']);
      }
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case OrderStatus.COMING:
        return 'En curso';
      case OrderStatus.COMPLETED:
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  }
}
