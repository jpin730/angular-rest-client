import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { authActions } from './auth.action';
import { Router } from '@angular/router';
import { PATH } from 'src/app/utils/constants';

export const authenticate = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.authenticate),
      exhaustMap(() =>
        authService.authenticate().pipe(
          tap(({ token, refresh }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refresh);
          }),
          map(({ user }) => authActions.authenticateSuccess({ user })),
          catchError(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            return of(authActions.authenticateFailure());
          }),
        ),
      ),
    ),
  { functional: true },
);

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({ email, password }) =>
        authService.login(email, password).pipe(
          tap(({ token, refresh }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refresh);
            router.navigate([PATH.home]);
          }),
          map(({ user }) => authActions.loginSuccess({ user })),
          catchError(() => of(authActions.loginFailure())),
        ),
      ),
    ),
  { functional: true },
);

export const logout = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        router.navigate([PATH.login]);
      }),
    ),

  { functional: true, dispatch: false },
);
