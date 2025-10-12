import { Routes } from '@angular/router';

export const signInRoutes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent) },
    { path: 'logout', loadComponent: () => import('./pages/logout-page/logout-page.component').then(c => c.LogoutPageComponent) }
];
