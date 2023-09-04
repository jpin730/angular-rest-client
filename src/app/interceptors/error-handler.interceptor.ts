import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ApiErrorMessage } from '../interfaces/api-error-messages';
import { API_PARSED_ERROR_MESSAGES } from 'src/app/utils/constants';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      const apiErrors: ApiErrorMessage[] | undefined = errorResponse.error.errors;
      if (apiErrors && Array.isArray(apiErrors)) {
        apiErrors.forEach(({ msg }) => toastr.error(parse(msg) || msg));
      } else if (errorResponse.message) {
        toastr.error(errorResponse.message);
      } else {
        toastr.error('Something went wrong, try again');
      }

      throw throwError(() => errorResponse);
    }),
  );
};

const parse = (msg: string): string | undefined =>
  API_PARSED_ERROR_MESSAGES.find(({ hint }) => msg.toLowerCase().includes(hint))?.message;
