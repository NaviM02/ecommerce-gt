import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/model';
import { environment } from '../../../../../environments/environment';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  protected readonly environment = environment;

  getStars(rating: number | undefined): number[] {
    if (!rating) return [];
    return Array(Math.round(rating || 0)).fill(0);
  }
}
