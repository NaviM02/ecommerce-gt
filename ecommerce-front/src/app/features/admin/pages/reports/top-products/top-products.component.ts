import { Component, OnInit } from '@angular/core';
import { TopProductDTO } from '../../../../../models/reports.dto';
import { ReportService } from '../../../../../services/core/reports.service';
import {
  SingleDatepickerComponent
} from '../../../../../commons/components/single-datepicker/single-datepicker.component';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';

@Component({
  selector: 'app-top-products',
  imports: [
    SingleDatepickerComponent,
    ListPageHeaderComponent
  ],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.scss'
})
export class TopProductsComponent implements OnInit {
  products: TopProductDTO[] = [];
  startDate: string;
  endDate: string;
  loading = false;

  constructor(private reportService: ReportService) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // 1 de enero
    const end = new Date(now.getFullYear(), 11, 31); // 31 de diciembre
    this.startDate = start.toISOString();
    this.endDate = end.toISOString();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.reportService.getTopProducts(this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onStartDateChange(date: string) {
    this.startDate = date;
  }

  onEndDateChange(date: string) {
    this.endDate = date;
  }

  onFilter() {
    this.loadData();
  }
}
