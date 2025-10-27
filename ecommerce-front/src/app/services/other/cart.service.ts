import { Injectable } from '@angular/core';
import { Product } from '../../models/model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) this.items = JSON.parse(saved);
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(product: Product, quantity = 1) {
    const existing = this.items.find(i => i.product.productId === product.productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.save();
  }

  removeItem(productId: number) {
    this.items = this.items.filter(i => i.product.productId !== productId);
    this.save();
  }

  updateItemQuantity(productId: number, quantity: number) {
    const items = this.getItems();
    const index = items.findIndex(i => i.product.productId === productId);
    if (index !== -1) {
      items[index].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
