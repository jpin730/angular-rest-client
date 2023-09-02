import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ErrorApiMessage } from '../interfaces/error-api-messages';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      const apiErrors: ErrorApiMessage[] | undefined = errorResponse.error.errors;
      if (apiErrors) {
        toastr.error(apiErrors.map(({ msg }) => msg).toString());
      } else if (errorResponse.message) {
        toastr.error(errorResponse.message);
      } else {
        toastr.error('Something went wrong, try again');
      }

      throw throwError(() => errorResponse);
    }),
  );
};
