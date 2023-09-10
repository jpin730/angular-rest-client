import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromAuth } from '../store/auth';
import { filter, map, switchMap } from 'rxjs';
import { PATH } from '../utils/constants';

export const isAuthenticated: CanActivateFn = (_, state) => {
  const { url } = state;
  const store = inject(Store);
  const router = inject(Router);

  return store.select(fromAuth.checked).pipe(
    filter((checked) => checked),
    switchMap(() => store.select(fromAuth.hasUser)),
    map((hasUser) => {
      if (hasUser) {
        return url.includes(PATH.login) ? router.parseUrl(PATH.home) : true;
      } else {
        return url.includes(PATH.login) ? true : router.parseUrl(PATH.login);
      }
    }),
  );
};

export const isAdmin: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(fromAuth.checked).pipe(
    filter((checked) => checked),
    switchMap(() => store.select(fromAuth.isAdmin)),
    map((isAdmin) => isAdmin || router.parseUrl(PATH.home)),
  );
};
