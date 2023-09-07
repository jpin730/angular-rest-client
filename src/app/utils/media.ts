import { Observable, fromEvent, map, startWith } from 'rxjs';

import { BREAKPOINT } from './constants';

type MediaMode = 'min-width' | 'max-width';

export const media$ = (mode: MediaMode, breakpoint: BREAKPOINT): Observable<boolean> => {
  const mediaQuery = window.matchMedia(`(${mode}: ${breakpoint})`);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map(({ matches }) => matches),
  );
};

export const media = (mode: MediaMode, breakpoint: BREAKPOINT): boolean =>
  window.matchMedia(`(${mode}: ${breakpoint})`).matches;
