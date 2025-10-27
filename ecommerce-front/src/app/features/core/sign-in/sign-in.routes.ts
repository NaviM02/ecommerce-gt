import { Routes } from '@angular/router';

export const signInRoutes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent) },
    { path: 'signup', loadComponent: () => import('./pages/create-account-page/create-account-page.component').then(c => c.CreateAccountPageComponent) }
];
