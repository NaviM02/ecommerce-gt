import { Component, OnInit } from '@angular/core';
import { TopSellerDTO } from '../../../../../models/reports.dto';
import { ReportService } from '../../../../../services/core/reports.service';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import {
  SingleDatepickerComponent
} from '../../../../../commons/components/single-datepicker/single-datepicker.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-top-clients-profit',
  imports: [
    ListPageHeaderComponent,
    SingleDatepickerComponent,
    DecimalPipe
  ],
  templateUrl: './top-clients-profit.component.html',
  styleUrl: './top-clients-profit.component.scss'
})
export class TopClientsProfitComponent implements OnInit {
  sellers: TopSellerDTO[] = [];
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
    this.reportService.getTopSellers(this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.sellers = res;
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
