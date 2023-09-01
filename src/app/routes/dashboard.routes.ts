import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../pages/profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('../pages/categories-page/categories-page.component').then(
        (m) => m.CategoriesPageComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../pages/products-page/products-page.component').then((m) => m.ProductsPageComponent),
  },
] as Routes;
