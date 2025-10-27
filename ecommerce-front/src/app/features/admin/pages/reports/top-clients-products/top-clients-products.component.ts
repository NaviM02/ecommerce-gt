import { Component, OnInit } from '@angular/core';
import { TopSellerByProductCountDTO } from '../../../../../models/reports.dto';
import { ReportService } from '../../../../../services/core/reports.service';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';

@Component({
  selector: 'app-top-clients-products',
  imports: [
    ListPageHeaderComponent
  ],
  templateUrl: './top-clients-products.component.html',
  styleUrl: './top-clients-products.component.scss'
})
export class TopClientsProductsComponent implements OnInit {
  sellers: TopSellerByProductCountDTO[] = [];
  startDate: string;
  endDate: string;
  loading = false;

  constructor(private reportService: ReportService) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear(), 11, 31);
    this.startDate = start.toISOString();
    this.endDate = end.toISOString();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.reportService.getTopSellersByProductCount().subscribe({
      next: (res) => {
        this.sellers = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
