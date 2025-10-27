import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { RoleEnum } from './models/role.enum';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'c/login' },
  {
    path: 'c',
    canActivate: [loginGuard],
    loadChildren: () => import('./features/core/sign-in/sign-in.routes').then(r => r.signInRoutes)
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.dashboardRoutes)
      },
      {
        path: 'admin',
        canActivate: [roleGuard([RoleEnum.ADMINISTRATOR])],
        loadChildren: () => import('./features/admin/admin.routes').then(r => r.  adminRoutes)
      },
      {
        path: 'user',
        canActivate: [roleGuard([RoleEnum.COMMON])],
        loadChildren: () => import('./features/common/common.routes').then(r => r.commonRoutes)
      },
      {
        path: 'moderator',
        canActivate: [roleGuard([RoleEnum.MODERATOR])],
        loadChildren: () => import('./features/moderator/moderator.routes').then(r => r.moderatorRoutes)
      },
      {
        path: 'logistic',
        canActivate: [roleGuard([RoleEnum.LOGISTICS])],
        loadChildren: () => import('./features/logistic/logistic.routes').then(r => r.logisticRoutes)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/core/profile/profile.routes').then(r => r.profileRoutes)
      },
    ]
  },

  { path: '**', redirectTo: 'c/login' }
];
