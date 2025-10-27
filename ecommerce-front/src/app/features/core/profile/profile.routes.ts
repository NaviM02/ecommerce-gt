import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/user-profile/user-profile.component').then(c => c.UserProfileComponent) },
  { path: 'edit', loadComponent: () => import('./pages/user-profile-edit/user-profile-edit.component').then(c => c.UserProfileEditComponent) },
]
