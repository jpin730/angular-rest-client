import { ResolveFn } from '@angular/router';
import { filter, interval, startWith, take } from 'rxjs';
import { GoogleClientLibrary } from '../interfaces/google-client-library';

declare let google: GoogleClientLibrary | undefined;

export const loginResolver: ResolveFn<number> = () => {
  return interval(1000).pipe(
    startWith(-1),
    take(5),
    filter(() => !!google),
    take(1),
  );
};
