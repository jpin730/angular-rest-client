import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import { CategoriesService } from 'src/app/services/categories.service';
import { ToastService } from 'src/app/services/toast.service';
import { categoriesActions } from './categories.action';

export const getCategories = createEffect(
  (actions$ = inject(Actions), categoriesService = inject(CategoriesService)) =>
    actions$.pipe(
      ofType(categoriesActions.getCategories),
      exhaustMap(({ limit, offset }) =>
        categoriesService.getCategories(limit, offset).pipe(
          map((res) => categoriesActions.getCategoriesSuccess(res)),
          catchError(() => of(categoriesActions.getCategoriesFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const getAllCategories = createEffect(
  (actions$ = inject(Actions), categoriesService = inject(CategoriesService)) =>
    actions$.pipe(
      ofType(categoriesActions.getAllCategories),
      exhaustMap(() =>
        categoriesService.getCategories(1).pipe(
          switchMap(({ total }) => categoriesService.getCategories(total)),
          map((res) => categoriesActions.getCategoriesSuccess(res)),
          catchError(() => of(categoriesActions.getCategoriesFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const searchCategories = createEffect(
  (actions$ = inject(Actions), categoriesService = inject(CategoriesService)) =>
    actions$.pipe(
      ofType(categoriesActions.searchCategories),
      exhaustMap(({ query, limit, offset }) =>
        categoriesService.searchCategories(query, limit, offset).pipe(
          map((res) => categoriesActions.searchCategoriesSuccess(res)),
          catchError(() => of(categoriesActions.searchCategoriesFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const createCategory = createEffect(
  (
    actions$ = inject(Actions),
    categoriesService = inject(CategoriesService),
    toastService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(categoriesActions.createCategory),
      exhaustMap(({ name }) =>
        categoriesService.createCategory({ name }).pipe(
          tap(() => toastService.success('Category was successfully created')),
          map(() => categoriesActions.createCategorySuccess()),
          catchError(() => of(categoriesActions.createCategoryFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const editCategory = createEffect(
  (
    actions$ = inject(Actions),
    categoriesService = inject(CategoriesService),
    toastService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(categoriesActions.editCategory),
      exhaustMap(({ name, id }) =>
        categoriesService.editCategory({ name, id }).pipe(
          tap(() => toastService.success('Category was successfully updated')),
          map(() => categoriesActions.editCategorySuccess()),
          catchError(() => of(categoriesActions.editCategoryFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const deleteCategory = createEffect(
  (
    actions$ = inject(Actions),
    categoriesService = inject(CategoriesService),
    toastService = inject(ToastService),
  ) =>
    actions$.pipe(
      ofType(categoriesActions.deleteCategory),
      exhaustMap(({ id }) =>
        categoriesService.deleteCategory(id).pipe(
          tap(() => toastService.success('Category was successfully deleted')),
          map(() => categoriesActions.deleteCategorySuccess()),
          catchError(() => of(categoriesActions.deleteCategoryFailure())),
        ),
      ),
    ),
  { functional: true },
);
