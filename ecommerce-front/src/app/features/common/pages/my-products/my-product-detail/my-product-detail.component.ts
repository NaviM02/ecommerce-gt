import { Component, OnInit } from '@angular/core';
import {
  DetailPageHeaderComponent
} from '../../../../../commons/components/detail-page-header/detail-page-header.component';
import { Product } from '../../../../../models/model';
import { ProductCondition } from '../../../../../models/product-condition.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/core/product.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-product-detail',
  imports: [
    DetailPageHeaderComponent,
    DatePipe
  ],
  templateUrl: './my-product-detail.component.html',
  styleUrl: './my-product-detail.component.scss'
})
export class MyProductDetailComponent implements OnInit {
  id!: number;
  product?: Product;
  imagePreviewUrl?: string;

  protected readonly ProductCondition = ProductCondition;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (!this.id) {
        this.toastService.error('Producto no encontrado');
        void this.router.navigate(['/user/products']);
        return;
      }

      this.loadProduct();
    });
  }

  loadProduct() {
    this.productService.findById(this.id).subscribe({
      next: prod => {
        this.product = prod;
        if (prod.imageUrl) this.imagePreviewUrl = environment.imagesUrl + prod.imageUrl;

      },
      error: (e: HttpErrorResponse) => {
        if (e.status === 404) {
          this.toastService.error('El producto no existe.');
          void this.router.navigate(['/user/products']);
          return
        }

        this.toastService.error('Error al cargar el producto.');
      }
    });
  }

  onDelete() {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    this.productService.delete(this.id).subscribe({
      next: _ => {
        this.toastService.success('Producto eliminado con éxito.');
        void this.router.navigate(['/user/products']);
      },
      error: () => this.toastService.error('Error al eliminar el producto.')
    });
  }
}
