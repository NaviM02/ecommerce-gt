import { Routes } from '@angular/router';

export const commonRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-products',
        children: [
          {
            path: '', loadComponent: () => import('./pages/my-products/my-product-list/my-product-list.component').then(c => c.MyProductListComponent),
          },
          {
            path: 'add', loadComponent: () => import('./pages/my-products/my-product-form/my-product-form.component').then(c => c.MyProductFormComponent),
          },
          {
            path: 'edit/:id', loadComponent: () => import('./pages/my-products/my-product-form/my-product-form.component').then(c => c.MyProductFormComponent),
          },
          {
            path: ':id', loadComponent: () => import('./pages/my-products/my-product-detail/my-product-detail.component').then(c => c.MyProductDetailComponent),
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '', loadComponent: () => import('./pages/products/product-list/product-list.component').then(c => c.ProductListComponent),
          },
          {
            path: ':id', loadComponent: () => import('./pages/products/product-detail/product-detail.component').then(c => c.ProductDetailComponent),
          },
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '', loadComponent: () => import('./pages/cart/cart-items-list/cart-items-list.component').then(c => c.CartItemsListComponent),
          },
          {
            path: ':id', loadComponent: () => import('./pages/products/product-detail/product-detail.component').then(c => c.ProductDetailComponent),
          },
        ]
      },
      {
        path: 'cards',
        children: [
          {
            path: '', loadComponent: () => import('./pages/cards/card-list/card-list.component').then(c => c.CardListComponent),
          },
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '', loadComponent: () => import('./pages/orders/order-list/order-list.component').then(c => c.OrderListComponent),
          },
          {
            path: ':id', loadComponent: () => import('./pages/orders/order-detail/order-detail.component').then(c => c.OrderDetailComponent),
          },
        ]
      },
    ]
  }
]
