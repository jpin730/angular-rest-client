import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

import { ApiErrorMessage } from '../types/api-error-messages';
import { API_PARSED_ERROR_MESSAGES } from 'src/app/utils/constants';
import { ToastService } from '../services/toast.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      const apiErrors: ApiErrorMessage[] | undefined = errorResponse.error.errors;
      if (apiErrors && Array.isArray(apiErrors)) {
        apiErrors.forEach(({ msg }) => toastService.error(parse(msg) || msg));
      } else {
        toastService.error('Something went wrong, try again');
      }

      throw throwError(() => errorResponse);
    }),
  );
};

const parse = (msg: string): string | undefined =>
  API_PARSED_ERROR_MESSAGES.find(({ hint }) => msg.toLowerCase().includes(hint))?.message;
