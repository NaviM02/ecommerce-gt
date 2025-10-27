import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        children: [
          {
            path: '', loadComponent: () => import('./pages/users/user-list/user-list.component').then(c => c.UserListComponent)
          },
          {
            path: 'add', loadComponent: () => import('./pages/users/user-form/user-form.component').then(c => c.UserFormComponent)
          },
          {
            path: 'edit/:id', loadComponent: () => import('./pages/users/user-form/user-form.component').then(c => c.UserFormComponent)
          },
          {
            path: ':id', loadComponent: () => import('./pages/users/user-detail/user-detail.component').then(c => c.UserDetailComponent)
          },
        ]
      },
      {
        path: 'reports',
        children: [
          {
            path: 'top-products', loadComponent: () => import('./pages/reports/top-products/top-products.component').then(c => c.TopProductsComponent)
          },
          {
            path: 'top-clients-profit', loadComponent: () => import('./pages/reports/top-clients-profit/top-clients-profit.component').then(c => c.TopClientsProfitComponent)
          },
          {
            path: 'top-clients-sales', loadComponent: () => import('./pages/reports/top-clients-sales/top-clients-sales.component').then(c => c.TopClientsSalesComponent)
          },
          {
            path: 'top-clients-orders', loadComponent: () => import('./pages/reports/top-clients-orders/top-clients-orders.component').then(c => c.TopClientsOrdersComponent)
          },
          {
            path: 'top-clients-products', loadComponent: () => import('./pages/reports/top-clients-products/top-clients-products.component').then(c => c.TopClientsProductsComponent)
          },
          {
            path: 'sanctions', loadComponent: () => import('./pages/reports/sanctions/sanctions.component').then(c => c.SanctionsComponent)
          },
          {
            path: 'notifications', loadComponent: () => import('./pages/reports/notifications/notifications.component').then(c => c.NotificationsComponent)
          },
        ]
      }
    ]
  }
]
