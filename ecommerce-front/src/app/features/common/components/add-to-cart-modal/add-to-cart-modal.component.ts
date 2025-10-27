import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../models/model';
import { CartService } from '../../../../services/other/cart.service';
import { ToastService } from '../../../../services/other/toast.service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-to-cart-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './add-to-cart-modal.component.html',
  styleUrl: './add-to-cart-modal.component.scss'
})
export class AddToCartModalComponent implements OnInit {
  @Input() product!: Product;

  quantity = 1;

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    if (this.product) {
      const existing = this.cartService
        .getItems()
        .find(i => i.product.productId === this.product.productId);

      this.quantity = existing ? existing.quantity : 1;
    }
  }

  confirm() {
    if (this.quantity > this.product.stock)
      return this.toastService.error('No puedes agregar más que el stock disponible.');

    const existing = this.cartService
      .getItems()
      .find(i => i.product.productId === this.product.productId);

    if (existing) {
      this.cartService.updateItemQuantity(this.product.productId, this.quantity);
      this.toastService.success(`Cantidad actualizada a ${this.quantity} en el carrito.`);
    } else {
      this.cartService.addItem(this.product, this.quantity);
      this.toastService.success(`${this.quantity} producto(s) agregados al carrito.`);
    }

    this.activeModal.close(true);
  }

  close() {
    this.activeModal.dismiss(false);
  }
}
