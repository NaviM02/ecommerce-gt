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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-product-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    StatusProductBadgeComponent,
    FormsModule
  ],
  templateUrl: './my-product-list.component.html',
  styleUrl: './my-product-list.component.scss'
})
export class MyProductListComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    searchTerm: string = '';

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
        this.filteredProducts = data;
      },
      error: () => this.toastService.error('Error del servidor')
    });
  }

  @confirmAction({
    title: 'Eliminar producto',
    bodyQuestion: '¿Enserio quieres eliminar este producto?',
    bodyText: 'Esta acción es irreversible',
    confirmText: 'Eliminar'
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

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  protected readonly environment = environment;
}
