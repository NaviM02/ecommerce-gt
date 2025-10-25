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
            path: '', loadComponent: () => import('./pages/reports/report-list/report-list.component').then(c => c.ReportListComponent)
          },
          {
            path: ':id', loadComponent: () => import('./pages/users/user-detail/user-detail.component').then(c => c.UserDetailComponent)
          },
        ]
      }
    ]
  }
]
