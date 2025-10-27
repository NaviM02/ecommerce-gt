import { Component, OnInit } from '@angular/core';
import { Product, User } from '../../../../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/core/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../../../services/other/toast.service';
import { AddToCartModalComponent } from '../../../../common/components/add-to-cart-modal/add-to-cart-modal.component';
import { environment } from '../../../../../../environments/environment';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DetailPageHeaderComponent
} from '../../../../../commons/components/detail-page-header/detail-page-header.component';
import { ProductStatus } from '../../../../../models/product-status.enum';

@Component({
  selector: 'app-product-m-detail',
  imports: [
    DatePipe,
    FormsModule,
    DetailPageHeaderComponent
  ],
  templateUrl: './product-m-detail.component.html',
  styleUrl: './product-m-detail.component.scss'
})
export class ProductMDetailComponent implements OnInit {
  private id!: number;
  product: Product = new Product();
  imagePreviewUrl?: string;
  environment = environment;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) this.loadProduct(this.id);
  }

  loadProduct(id: number) {
    this.productService.findById(id).subscribe({
      next: p => {
        this.product = p;
        if (p.imageUrl) this.imagePreviewUrl = environment.imagesUrl + p.imageUrl;
      },
      error: () => this.toastService.error('Error al cargar el producto.')
    });
  }

  getStars(stars: number): number[] {
    return Array.from({ length: stars });
  }

  getEmptyStars(stars: number): number[] {
    return Array.from({ length: 5 - stars });
  }

  accept() {
    this.product.seller = <User>{ userId: this.product.sellerId };
    this.product.status = ProductStatus.APPROVED;
    this.productService.save(this.product).subscribe({
      next: _ => {
        this.toastService.info('Producto Aceptado!');
        void this.router.navigate(['moderator', 'products']);
      },
      error: () => this.toastService.error('Error al guardar el producto')
    })
  }
  reject() {
    this.product.seller = <User>{ userId: this.product.sellerId };
    this.product.status = ProductStatus.REJECTED;
    this.productService.save(this.product).subscribe({
      next: _ => {
        this.toastService.info('Producto Rechazado!');
        void this.router.navigate(['moderator', 'products']);
      },
      error: () => this.toastService.error('Error al guardar el producto')
    })
  }

  protected readonly Math = Math;
}
