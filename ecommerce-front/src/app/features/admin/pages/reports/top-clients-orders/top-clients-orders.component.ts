import { Component, OnInit } from '@angular/core';
import { TopCustomerByOrdersDTO } from '../../../../../models/reports.dto';
import { ReportService } from '../../../../../services/core/reports.service';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import {
  SingleDatepickerComponent
} from '../../../../../commons/components/single-datepicker/single-datepicker.component';

@Component({
  selector: 'app-top-clients-orders',
  imports: [
    ListPageHeaderComponent,
    SingleDatepickerComponent
  ],
  templateUrl: './top-clients-orders.component.html',
  styleUrl: './top-clients-orders.component.scss'
})
export class TopClientsOrdersComponent implements OnInit {
  customers: TopCustomerByOrdersDTO[] = [];
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
    this.reportService.getTopCustomersByOrders(this.startDate, this.endDate).subscribe({
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
