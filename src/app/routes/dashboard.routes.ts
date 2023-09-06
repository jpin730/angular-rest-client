import { Routes } from '@angular/router';
import { PATH } from '../utils/constants';

export default [
  {
    path: PATH.home,
    pathMatch: 'full',
    loadComponent: () =>
      import('../pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: PATH.profile,
    loadComponent: () =>
      import('../pages/profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
  },
  {
    path: PATH.users,
    loadComponent: () =>
      import('../pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: PATH.categories,
    loadComponent: () =>
      import('../pages/categories-page/categories-page.component').then(
        (m) => m.CategoriesPageComponent,
      ),
  },
  {
    path: PATH.products,
    loadComponent: () =>
      import('../pages/products-page/products-page.component').then((m) => m.ProductsPageComponent),
  },
] as Routes;
