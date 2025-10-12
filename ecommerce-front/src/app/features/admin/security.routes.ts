import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',/*
        children: [
          {
            path: '', loadComponent: () => import('./pages/users/user-list/user-list.component').then(c => c.UserListComponent)
          },
          {
            path: 'add', loadComponent: () => import('./pages/users/user-form/user-form.component').then(c => c.UserFormComponent)
          },
          {
            path: 'edit/:hashId', loadComponent: () => import('./pages/users/user-form/user-form.component').then(c => c.UserFormComponent)
          },
          {
            path: ':hashId', loadComponent: () => import('./pages/users/user-detail/user-detail.component').then(c => c.UserDetailComponent)
          },
        ]*/
      }
    ]
  }
]
