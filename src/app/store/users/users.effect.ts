import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { userActions } from './users.action';
import { routerNavigatedAction } from '@ngrx/router-store';
import { PATH } from 'src/app/utils/constants';

export const initUsers = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.routerState.url.includes(PATH.users)),
      exhaustMap(() => of(userActions.getUsers({}))),
    ),
  { functional: true },
);

export const getUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) =>
    actions$.pipe(
      ofType(userActions.getUsers),
      exhaustMap(({ limit, offset }) =>
        usersService.getUsers(limit, offset).pipe(
          map((res) => userActions.getUsersSuccess(res)),
          catchError(() => of(userActions.getUsersFailure())),
        ),
      ),
    ),
  { functional: true },
);
