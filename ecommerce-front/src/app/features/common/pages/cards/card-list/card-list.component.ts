import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../../../../../models/model';
import { CreditCardService } from '../../../../../services/core/credit-card.service';
import { AuthService } from '../../../../../services/core/auth.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ConfirmActionService } from '../../../../../services/other/confirm-action.service';
import { confirmAction } from '../../../../../commons/decorators/confirm.decorator';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TableRowActionComponent } from '../../../../../commons/components/table-row-action/table-row-action.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-list',
  imports: [
    ListPageHeaderComponent,
    TableRowActionComponent,
    DatePipe
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit {
  cards: CreditCard[] = [];

  constructor(
    private creditCardService: CreditCardService,
    private authService: AuthService,
    private toastService: ToastService,
    private confirmActionService: ConfirmActionService
  ) {}

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    const userId = this.authService.getUserId();
    if (!userId) return;
    this.creditCardService.findByUserId(userId).subscribe({
      next: data => (this.cards = data),
      error: () => this.toastService.error('Error al cargar tarjetas')
    });
  }

  @confirmAction({
    title: 'Eliminar Tarjeta',
    bodyQuestion: '¿Deseas eliminar esta tarjeta?',
    confirmText: 'Sí, eliminar'
  })
  delete(id: number) {
    this.creditCardService.delete(id).subscribe({
      next: () => {
        this.findAll();
        this.toastService.success('Tarjeta eliminada');
      },
      error: () => this.toastService.error('Error al eliminar')
    });
  }
}
