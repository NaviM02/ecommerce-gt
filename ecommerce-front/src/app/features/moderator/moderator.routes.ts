import { Routes } from '@angular/router';

export const moderatorRoutes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '', loadComponent: () => import('./pages/products/product-m-list/product-m-list.component').then(c => c.ProductMListComponent),
      },
      {
        path: ':id', loadComponent: () => import('./pages/products/product-m-detail/product-m-detail.component').then(c => c.ProductMDetailComponent),
      }
    ]
  },
]
