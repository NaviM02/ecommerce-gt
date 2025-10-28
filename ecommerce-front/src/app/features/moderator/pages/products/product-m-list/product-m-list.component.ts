import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/model';
import { ProductService } from '../../../../../services/core/product.service';
import { AuthService } from '../../../../../services/core/auth.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ProductStatus } from '../../../../../models/product-status.enum';
import { environment } from '../../../../../../environments/environment';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import {
  StatusProductBadgeComponent
} from '../../../../../commons/components/status-product-badge/status-product-badge.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-m-list',
  imports: [
    ListPageHeaderComponent,
    StatusProductBadgeComponent,
    TableRowActionComponent,
    FormsModule
  ],
  templateUrl: './product-m-list.component.html',
  styleUrl: './product-m-list.component.scss'
})
export class ProductMListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.productService.findAll(ProductStatus.PENDING).subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: () => this.toastService.error('Error del servidor')
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
