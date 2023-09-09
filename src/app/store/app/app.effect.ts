import { inject } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';

import { authActions } from '../auth/auth.action';

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
