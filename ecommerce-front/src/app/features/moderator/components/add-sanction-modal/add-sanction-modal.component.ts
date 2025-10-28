import { Component, Input } from '@angular/core';
import { Sanction } from '../../../../models/model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanctionService } from '../../../../services/core/sanction.service';
import { ToastService } from '../../../../services/other/toast.service';
import { AuthService } from '../../../../services/core/auth.service';
import { FormsModule } from '@angular/forms';
import {
  SingleDatepickerComponent
} from '../../../../commons/components/single-datepicker/single-datepicker.component';

@Component({
  selector: 'app-add-sanction-modal',
  imports: [
    FormsModule,
    SingleDatepickerComponent
  ],
  templateUrl: './add-sanction-modal.component.html',
  styleUrl: './add-sanction-modal.component.scss'
})
export class AddSanctionModalComponent {
  @Input() sellerId!: number;
  @Input() sellerName!: string;

  sanction: Sanction = new Sanction();

  constructor(
    public activeModal: NgbActiveModal,
    private sanctionService: SanctionService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  save(): void {
    if (!this.sanction.reason || !this.sanction.endDate) return this.toastService.warning('Debe ingresar motivo y fecha de fin');
    const userId = this.authService.getUserId();
    if (!userId) return this.toastService.warning('No hay ususario loggeado');

    this.sanction.userId = this.sellerId;
    this.sanction.moderatorId = userId;

    this.sanctionService.save(this.sanction).subscribe({
      next: () => {
        this.toastService.success('Sanción creada correctamente');
        this.activeModal.close(true);
      },
      error: () => {
        this.toastService.error('Error al crear la sanción');
      }
    });
  }

  close(): void {
    this.activeModal.dismiss(false);
  }
}
