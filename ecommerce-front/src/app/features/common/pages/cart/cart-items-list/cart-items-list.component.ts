import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../../../../services/other/cart.service';
import { DecimalPipe } from '@angular/common';
import { PaymentModalComponent } from '../../../components/payment-modal/payment-modal.component';
import { ToastService } from '../../../../../services/other/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';
import { Router } from '@angular/router';
import { ConfirmActionService } from '../../../../../services/other/confirm-action.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-cart-items-list',
  imports: [
    DecimalPipe
  ],
  templateUrl: './cart-items-list.component.html',
  styleUrl: './cart-items-list.component.scss'
})
export class CartItemsListComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private confirmActionService: ConfirmActionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
  }

  updateQuantity(productId: number, event: Event) {
    const quantity = Number((event.target as HTMLInputElement).value);
    if (quantity <= 0) return;
    this.cartService.updateItemQuantity(productId, quantity);
    this.loadCart();
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.product.productId);
    this.loadCart();
  }

  @confirmAction({
    title: 'Limpiar carrito',
    bodyQuestion: '¿Deseas limpiar tu carrito?',
    confirmText: 'Sí, eliminar'
  })
  clearCart() {
    this.cartService.clear();
    this.loadCart();
    this.toastService.success('Carrito vaciado correctamente.');
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  openPaymentModal() {
    this.modalService.open(PaymentModalComponent, {
      centered: true,
      backdrop: 'static',
    });
  }

  goToProducts() {
    this.router.navigate(['/user/products']).then(_ => {});
  }

  goToProduct(productId: number) {
    this.router.navigate(['user/products', productId]).then(_ => {});
  }

  protected readonly environment = environment;
}
