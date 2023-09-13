import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { usersActions } from './users.action';

export const getUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) =>
    actions$.pipe(
      ofType(usersActions.getUsers),
      exhaustMap(({ limit, offset }) =>
        usersService.getUsers(limit, offset).pipe(
          map((res) => usersActions.getUsersSuccess(res)),
          catchError(() => of(usersActions.getUsersFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const searchUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) =>
    actions$.pipe(
      ofType(usersActions.searchUsers),
      exhaustMap(({ query, limit, offset }) =>
        usersService.searchUsers(query, limit, offset).pipe(
          map((res) => usersActions.searchUsersSuccess(res)),
          catchError(() => of(usersActions.searchUsersFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const createUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) =>
    actions$.pipe(
      ofType(usersActions.createUser),
      exhaustMap(({ email, username, role, password }) =>
        usersService.createUser({ email, username, role, password }).pipe(
          map(() => usersActions.createUserSuccess()),
          catchError(() => of(usersActions.createUserFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const editUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) =>
    actions$.pipe(
      ofType(usersActions.editUser),
      exhaustMap(({ id, email, username, role, password }) =>
        usersService.editUser({ id, email, username, role, password }).pipe(
          map(() => usersActions.editUserSuccess()),
          catchError(() => of(usersActions.editUserFailure())),
        ),
      ),
    ),
  { functional: true },
);
