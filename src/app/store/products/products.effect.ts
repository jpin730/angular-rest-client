import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';
import { productsActions } from './products.action';
import { ToastService } from 'src/app/services/toast.service';

export const getProducts = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(productsActions.getProducts),
      exhaustMap(({ limit, offset }) =>
        productsService.getProducts(limit, offset).pipe(
          map((res) => productsActions.getProductsSuccess(res)),
          catchError(() => of(productsActions.getProductsFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const searchProducts = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(productsActions.searchProducts),
      exhaustMap(({ query, limit, offset }) =>
        productsService.searchProducts(query, limit, offset).pipe(
          map((res) => productsActions.searchProductsSuccess(res)),
          catchError(() => of(productsActions.searchProductsFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const createProduct = createEffect(
  (
    actions$ = inject(Actions),
    productsService = inject(ProductsService),
    toastService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(productsActions.createProduct),
      exhaustMap(({ name, category, price, inStock }) =>
        productsService.createProduct({ name, category, price, inStock }).pipe(
          tap(() => toastService.success('Product was successfully created')),
          map(() => productsActions.createProductSuccess()),
          catchError(() => of(productsActions.createProductFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const editProduct = createEffect(
  (
    actions$ = inject(Actions),
    productsService = inject(ProductsService),
    toastService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(productsActions.editProduct),
      exhaustMap(({ name, id, category, price, inStock }) =>
        productsService.editProduct({ name, id, category, price, inStock }).pipe(
          tap(() => toastService.success('Product was successfully updated')),
          map(() => productsActions.editProductSuccess()),
          catchError(() => of(productsActions.editProductFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const deleteProduct = createEffect(
  (
    actions$ = inject(Actions),
    productsService = inject(ProductsService),
    toastService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(productsActions.deleteProduct),
      exhaustMap(({ id }) =>
        productsService.deleteProduct(id).pipe(
          tap(() => toastService.success('Product was successfully deleted')),
          map(() => productsActions.deleteProductSuccess()),
          catchError(() => of(productsActions.deleteProductFailure())),
        ),
      ),
    ),
  { functional: true },
);
