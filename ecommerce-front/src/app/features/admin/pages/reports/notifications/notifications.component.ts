import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../services/core/notification.service';
import { Notification } from '../../../../../models/model';
import { ListPageHeaderComponent } from '../../../../../commons/components/list-page-header/list-page-header.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [
    ListPageHeaderComponent,
    TitleCasePipe
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.notificationService.findAll().subscribe({
      next: (res) => {
        this.notifications = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('es-GT', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTypeBadgeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'info': return 'badge bg-primary';
      case 'warning': return 'badge bg-warning text-dark';
      case 'error': return 'badge bg-danger';
      case 'success': return 'badge bg-success';
      default: return 'badge bg-success';
    }
  }
}
