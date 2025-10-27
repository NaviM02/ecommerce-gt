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
import { FormsModule } from '@angular/forms';
import {
  SingleDatepickerComponent
} from '../../../../../commons/components/single-datepicker/single-datepicker.component';

@Component({
  selector: 'app-pending-order-detail',
  imports: [
    DatePipe,
    DecimalPipe,
    DetailPageHeaderComponent,
    ViewFieldComponent,
    FormsModule,
    SingleDatepickerComponent
  ],
  templateUrl: './pending-order-detail.component.html',
  styleUrl: './pending-order-detail.component.scss'
})
export class PendingOrderDetailComponent implements OnInit {
  orderId!: number;
  order: Order = new Order();
  newDeliveryDate: string = '';

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
        void this.router.navigate(['/logistic/orders']);
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

  updateDeliveryDate() {
    if (!this.newDeliveryDate && this.newDeliveryDate === '') return this.toastService.warning('Seleccione una fecha válida');

    const selected = new Date(this.newDeliveryDate);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (selected < today) return this.toastService.warning('No puede establecer una fecha anterior a hoy');

    const updatedOrder = { ...this.order, deliveryDate: this.newDeliveryDate };
    this.orderService.save(updatedOrder).subscribe({
      next: () => {
        this.toastService.success('Fecha de entrega actualizada');
        this.order.deliveryDate = this.newDeliveryDate as any;
      },
      error: () => this.toastService.error('No se pudo actualizar la fecha')
    });
  }

  markAsDelivered() {
    if (!this.order.deliveryDate) return this.toastService.warning('La orden no tiene una fecha de entrega establecida');

    const delivery = new Date(this.order.deliveryDate);
    const today = new Date();
    delivery.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (delivery.getTime() !== today.getTime()) return this.toastService.warning('Solo puede marcar la orden como entregada en la fecha programada de entrega');

    const updatedOrder = { ...this.order, status: OrderStatus.COMPLETED };

    this.orderService.save(updatedOrder).subscribe({
      next: () => {
        this.toastService.success('Orden marcada como entregada');
        this.order.status = OrderStatus.COMPLETED;
      },
      error: () => this.toastService.error('No se pudo actualizar el estado')
    });
  }

  protected readonly OrderStatus = OrderStatus;
}
