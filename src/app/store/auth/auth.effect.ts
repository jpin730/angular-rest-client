import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { authActions } from './auth.action';

export const authenticate = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.authenticate),
      exhaustMap(() => authService.authenticate()),
      map((res) => authActions.authenticateSuccess({ user: res })),
      catchError(() => of(authActions.authenticateFailure())),
    ),
  { functional: true },
);
