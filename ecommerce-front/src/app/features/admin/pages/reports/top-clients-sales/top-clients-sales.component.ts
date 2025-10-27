import { Component, OnInit } from '@angular/core';
import { TopCustomerBySpendingDTO } from '../../../../../models/reports.dto';
import { ReportService } from '../../../../../services/core/reports.service';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import {
  SingleDatepickerComponent
} from '../../../../../commons/components/single-datepicker/single-datepicker.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-top-clients-sales',
  imports: [
    ListPageHeaderComponent,
    SingleDatepickerComponent,
    DecimalPipe
  ],
  templateUrl: './top-clients-sales.component.html',
  styleUrl: './top-clients-sales.component.scss'
})
export class TopClientsSalesComponent implements OnInit {
  customers: TopCustomerBySpendingDTO[] = [];
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
    this.reportService.getTopCustomersBySpending(this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.customers = res;
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
