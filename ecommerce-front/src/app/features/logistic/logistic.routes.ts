import { Routes } from '@angular/router';

export const logisticRoutes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: '', loadComponent: () => import('./pages/orders/pending-orders-list/pending-orders-list.component').then(c => c.PendingOrdersListComponent)
      },
      {
        path: ':id', loadComponent: () => import('./pages/orders/pending-order-detail/pending-order-detail.component').then(c => c.PendingOrderDetailComponent)
      }
    ]
  }
]
