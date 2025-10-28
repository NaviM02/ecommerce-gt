import { Component, OnInit } from '@angular/core';
import { Sanction } from '../../../../../models/model';
import { SanctionService } from '../../../../../services/core/sanction.service';
import { ToastService } from '../../../../../services/other/toast.service';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sanctions',
  imports: [
    ListPageHeaderComponent,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './sanctions.component.html',
  styleUrl: './sanctions.component.scss'
})
export class SanctionsComponent implements OnInit{
  sanctions: Sanction[] = [];
  loading = false;

  constructor(
    private sanctionService: SanctionService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadSanctions();
  }

  loadSanctions() {
    this.loading = true;
    this.sanctionService.findAll().subscribe({
      next: (data) => {
        this.sanctions = data;
        this.loading = false;
      },
      error: () => {
        this.toastService.error('Error al cargar las sanciones.');
        this.loading = false;
      }
    });
  }
}
