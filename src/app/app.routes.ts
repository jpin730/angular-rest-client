import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { isAuthenticated } from './guards/auth.guard';
import { PATH } from './utils/constants';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [isAuthenticated],
    loadChildren: () => import('./routes/dashboard.routes'),
  },
  {
    path: PATH.login,
    canActivate: [isAuthenticated],
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  { path: '**', redirectTo: PATH.login },
];
