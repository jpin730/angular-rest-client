import { inject } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, of } from 'rxjs';

import { authActions } from '../auth/auth.action';
import { routerNavigatedAction } from '@ngrx/router-store';
import { usersActions } from '../users/users.action';
import { PATH } from 'src/app/utils/constants';
import { categoriesActions } from '../categories/categories.action';

export const init = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        of(
          localStorage.getItem('refresh')
            ? authActions.authenticate()
            : authActions.authenticateFailure(),
        ),
      ),
    ),
  { functional: true },
);

export const initUsers = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.routerState.url.includes(PATH.users)),
      exhaustMap(() => of(usersActions.getUsers({}))),
    ),
  { functional: true },
);

export const initCategories = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.routerState.url.includes(PATH.categories)),
      exhaustMap(() => of(categoriesActions.getCategories({}))),
    ),
  { functional: true },
);
