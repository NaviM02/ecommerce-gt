import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/model';
import { ProductService } from '../../../../../services/core/product.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { ProductStatus } from '../../../../../models/product-status.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.findAll(ProductStatus.APPROVED).subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: () => this.toastService.error('Error al cargar productos.')
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }
}
