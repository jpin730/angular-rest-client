import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromAuth } from '../store/auth';
import { filter, map, switchMap } from 'rxjs';

export const isAuthenticated: CanActivateFn = (_, state) => {
  const { url } = state;
  const store = inject(Store);
  const router = inject(Router);

  return store.select(fromAuth.isLoading).pipe(
    filter((isLoading) => !isLoading),
    switchMap(() => store.select(fromAuth.hasUser)),
    map((hasUser) => {
      if (hasUser) {
        return url.startsWith('/login') ? router.parseUrl('/') : true;
      } else {
        return url.startsWith('/login') ? true : router.parseUrl('/login');
      }
    }),
  );
};
