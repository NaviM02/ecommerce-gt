import { Component, OnInit } from '@angular/core';
import { Category, Product, User } from '../../../../../models/model';
import { ProductService } from '../../../../../services/core/product.service';
import { CategoryService } from '../../../../../services/core/category.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, iif, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormPageHeaderComponent } from '../../../../../commons/components/form-page-header/form-page-header.component';
import {
  InputInvalidFeedbackComponent
} from '../../../../../commons/components/input-invalid-feedback/input-invalid-feedback.component';
import { FormsModule } from '@angular/forms';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { FormActionsComponent } from '../../../../../commons/components/form-actions/form-actions.component';
import {
  RequiredIndicatorComponent
} from '../../../../../commons/components/required-indicator/required-indicator.component';
import { NgClass } from '@angular/common';
import { ProductCondition } from '../../../../../models/product-condition.enum';
import { AuthService } from '../../../../../services/core/auth.service';
import { environment } from '../../../../../../environments/environment';
import { ProductStatus } from '../../../../../models/product-status.enum';

@Component({
  selector: 'app-my-product-form',
  imports: [
    FormPageHeaderComponent,
    InputInvalidFeedbackComponent,
    FormsModule,
    NgSelectComponent,
    FormActionsComponent,
    RequiredIndicatorComponent,
    NgOptionComponent,
    NgClass
  ],
  templateUrl: './my-product-form.component.html',
  styleUrl: './my-product-form.component.scss'
})
export class MyProductFormComponent implements OnInit {
  protected readonly ProductCondition = ProductCondition;

  id!: number | null;
  product: Product = new Product();
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  imageFile?: File;
  imagePreviewUrl?: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => this.id = Number(params.get('id'))),
        concatMap(() => this.categoryService.findAll()),
        tap(cats => this.categories = cats),
        concatMap(() =>
          iif(
            () => !!this.id,
            this.productService.findById(this.id!).pipe(
              tap(prod => {
                this.product = prod;
                this.selectedCategories = prod.categories || [];
                if (prod.imageUrl) this.imagePreviewUrl = environment.imagesUrl + prod.imageUrl;
              })
            ),
            of(null)
          )
        )
      )
      .subscribe({
        error: (e: HttpErrorResponse) => {
          if (e.status === 404) {
            this.toastService.error('El producto no existe.');
            void this.router.navigate(['user', 'products']);
            return;
          }
          this.toastService.error('Ocurrió un error en el servidor.');
        }
      });
  }

  onSave() {
    if (!this.isValid) return this.toastService.warning('Campos requeridos faltantes');

    const userId = this.authService.getUserId();
    if (!userId) return;
    this.product.seller = <User>{ userId };
    this.product.categories = this.selectedCategories;
    this.product.status = ProductStatus.PENDING;

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(this.product)], { type: 'application/json' }));
    if (this.imageFile) formData.append('image', this.imageFile);

    this.productService.save(this.product, this.imageFile).subscribe({
      next: _ => {
        this.toastService.success('Producto guardado con éxito');
        void this.router.navigate(['user', 'my-products']);
      },
      error: () => this.toastService.error('Error al guardar el producto')
    });
  }

  get isValid(): boolean {
    return !!this.product.name?.trim() && !!this.selectedCategories?.length;
  }

  onImageSelected(event: any) {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      this.imageFile = file;
      this.imagePreviewUrl = URL.createObjectURL(file);
    }
  }

  compareCategories(c1: Category, c2: Category): boolean {
    return !!c1 && !!c2 && c1.categoryId === c2.categoryId;
  }
}
