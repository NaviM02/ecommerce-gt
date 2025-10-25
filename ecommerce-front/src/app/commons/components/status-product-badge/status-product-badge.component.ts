import { Component, Input } from '@angular/core';
import { ProductStatus } from '../../../models/product-status.enum';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-product-badge',
  imports: [
    NgClass
  ],
  templateUrl: './status-product-badge.component.html',
  styleUrl: './status-product-badge.component.scss'
})
export class StatusProductBadgeComponent {
  @Input() status!: number;

  get label(): string {
    switch (this.status) {
      case ProductStatus.PENDING:
        return 'Pendiente';
      case ProductStatus.APPROVED:
        return 'Aprobado';
      case ProductStatus.REJECTED:
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  }

  get badgeClass(): string {
    switch (this.status) {
      case ProductStatus.PENDING:
        return 'badge-yellow';
      case ProductStatus.APPROVED:
        return 'badge-green';
      case ProductStatus.REJECTED:
        return 'badge-red';
      default:
        return 'badge-gray';
    }
  }
}
