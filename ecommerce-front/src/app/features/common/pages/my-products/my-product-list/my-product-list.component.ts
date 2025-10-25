import { Component, OnInit } from '@angular/core';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { Product } from '../../../../../models/model';
import { ProductService } from '../../../../../services/core/product.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ConfirmActionService } from '../../../../../services/other/confirm-action.service';
import { AuthService } from '../../../../../services/core/auth.service';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';
import { environment } from '../../../../../../environments/environment';
import { ProductStatus } from '../../../../../models/product-status.enum';
import { ProductCondition } from '../../../../../models/product-condition.enum';
import { StatusProductBadgeComponent } from '../../../../../commons/components/status-product-badge/status-product-badge.component';

@Component({
  selector: 'app-my-product-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    StatusProductBadgeComponent
  ],
  templateUrl: './my-product-list.component.html',
  styleUrl: './my-product-list.component.scss'
})
export class MyProductListComponent implements OnInit {
    products: Product[] = [];

    constructor(
      private productService: ProductService,
      private authService: AuthService,
      private toastService: ToastService,
      private confirmActionService: ConfirmActionService
    ) {
    }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.productService.findByUserId(userId).subscribe({
      next: data => {
        this.products = data;
        console.log(this.products);
      },
      error: () => this.toastService.error('Error del servidor')
    });
  }

  @confirmAction({
    title: 'txt_delete_product',
    bodyQuestion: 'txt_confirm_really_want_delete_product',
    bodyText: 'txt_irreversible_action',
    confirmText: 'txt_understand_delete'
  })
  delete(id: number) {
    this.productService.delete(id).subscribe({
      next: _ => {
        this.findAll();
        this.toastService.success('msg_success_delete');
      },
      error: _ => this.toastService.error('msg_error_server')
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
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

  getConditionLabel(condition: number): string {
    switch (condition) {
      case ProductCondition.NEW:
        return 'Nuevo';
      case ProductCondition.USED:
        return 'Usado';
      default:
        return 'Desconocido';
    }
  }

  protected readonly environment = environment;
}
