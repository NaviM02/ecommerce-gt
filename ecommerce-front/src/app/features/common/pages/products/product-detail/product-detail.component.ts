import { Component, OnInit } from '@angular/core';
import { Product, Rating } from '../../../../../models/model';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../services/core/product.service';
import { RatingService } from '../../../../../services/core/rating.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { AuthService } from '../../../../../services/core/auth.service';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddToCartModalComponent } from '../../../components/add-to-cart-modal/add-to-cart-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  imports: [
    DatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private id!: number;
  product: Product = new Product();
  imagePreviewUrl?: string;

  newRating = { stars: 0, comment: '' };
  submitting = false;
  environment = environment;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private ratingService: RatingService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthService
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

  addRating() {
    if (!this.product) return;

    const userId = this.authService.getUserId();
    if (!userId) return this.toastService.error('Debes iniciar sesión para calificar.');
    if (this.newRating.stars < 1) return this.toastService.error('Selecciona al menos una estrella.');

    this.submitting = true;

    const payload = {
      productId: this.id,
      userId: userId,
      stars: this.newRating.stars,
      comment: this.newRating.comment
    };

    this.ratingService.save(payload as Rating).subscribe({
      next: rating => {
        this.toastService.success('¡Gracias por tu calificación!');
        if (!this.product!.ratings) this.product!.ratings = [];
        this.product!.ratings.unshift(rating as Rating);
        this.newRating = { stars: 0, comment: '' };
        this.submitting = false;
      },
      error: () => {
        this.toastService.error('Error al enviar tu calificación.');
        this.submitting = false;
      }
    });
  }

  openAddCartModal() {
    const modalRef = this.modalService.open(AddToCartModalComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });

    modalRef.componentInstance.product = this.product;
  }

  protected readonly Math = Math;
}
