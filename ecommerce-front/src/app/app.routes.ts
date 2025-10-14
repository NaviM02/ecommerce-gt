import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'c/login' },
  {
    path: 'c',
    loadChildren: () => import('./features/core/sign-in/sign-in.routes').then(r => r.signInRoutes)
  },
  {
    path: '',
    component: MainComponent,
    children: [
      /*{
        // demo routes for development purpose only
        path: 'demo',
        //loadChildren: () => import('./features/demo/demo.routes').then(r => r.demoRoutes)
      },*/
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.dashboardRoutes)
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(r => r.  adminRoutes)
      }
    ]
  }
];
