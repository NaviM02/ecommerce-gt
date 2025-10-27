import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../../services/other/toast.service';
import { CreditCard, Order, OrderDetail } from '../../../../models/model';
import { CreditCardService } from '../../../../services/core/credit-card.service';
import { AuthService } from '../../../../services/core/auth.service';
import { CartService } from '../../../../services/other/cart.service';
import { OrderStatus } from '../../../../models/order-status.enum';
import { OrderService } from '../../../../services/core/order.service';

@Component({
  selector: 'app-payment-modal',
  imports: [
    FormsModule,
  ],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent implements OnInit {
  cards: CreditCard[] = [];
  selectedCardId?: number;
  cardNumber = '';
  cardName = '';
  expirationDate = '';
  saveCard = false;

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private creditCardService: CreditCardService,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) return;
    this.creditCardService.findByUserId(userId).subscribe({
      next: data => (this.cards = data),
      error: () => this.toastService.error('Error al cargar tarjetas')
    });
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  pay() {
    if (!this.cardNumber && !this.selectedCardId) return this.toastService.error('Selecciona o ingresa una tarjeta.');
    if (!this.cardName && !this.selectedCardId) return this.toastService.error('Debes ingresar el nombre en la tarjeta.');
    const userId = this.authService.getUserId();
    if (!userId) return;

    if (this.saveCard && !this.selectedCardId) {
      const newCard: CreditCard = new CreditCard();
      newCard.userId = userId;
      newCard.cardNumber = this.cardNumber;
      newCard.cardholderName = this.cardName;
      newCard.expirationDate = `${this.expirationDate}-01`

      this.creditCardService.save(newCard).subscribe({
        next: () => this.toastService.success('Tarjeta guardada exitosamente.'),
        error: () => this.toastService.error('Error al guardar tarjeta')
      });
    }

    const items: OrderDetail[] = this.cartService.getItems().map(i => ({
      productId: i.product.productId,
      quantity: i.quantity,
      price: i.product.price,
      productName: i.product.name
    }));

    const newOrder: Order = new Order();
    newOrder.userId = userId;
    newOrder.status = OrderStatus.COMING;
    newOrder.items = items;
    newOrder.totalPrice = this.cartService.getTotal();

    this.orderService.save(newOrder).subscribe({
      next: () => {
        this.toastService.success('Pago y orden procesados correctamente.');
        this.cartService.clear();
        this.activeModal.close(true);
      },
      error: (err) => this.toastService.error('Error al procesar la orden: ' + err.message)
    })
  }
}
