import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { UploadService } from 'src/app/services/upload.service';
import { uploadActions } from './upload.action';
import { PutUploadAvatar } from 'src/app/interfaces/api-upload-responses';
import { User } from 'src/app/interfaces/user';
import { authActions } from '../auth/auth.action';
import { ToastService } from 'src/app/services/toast.service';

export const uploadUserAvatar = createEffect(
  (actions$ = inject(Actions), uploadService = inject(UploadService)) =>
    actions$.pipe(
      ofType(uploadActions.uploadUserAvatar, uploadActions.cancelUserAvatarUpload),
      switchMap((action) =>
        action.type === uploadActions.uploadUserAvatar.type
          ? uploadService.updateAvatar(action.body).pipe(
              filter((event) => event.type === HttpEventType.Response),
              map((event) =>
                uploadActions.uploadUserAvatarSuccess({
                  user: (event as HttpResponse<PutUploadAvatar>).body?.updatedUser as User,
                }),
              ),
              catchError(() => of(uploadActions.uploadUserAvatarFailure())),
            )
          : of(uploadActions.uploadUserAvatarFailure()),
      ),
    ),
  { functional: true },
);

export const uploadUserAvatarSuccess = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(uploadActions.uploadUserAvatarSuccess),
      exhaustMap(({ user }) => of(authActions.setUser({ user }))),
      tap(() => toastService.success('Avatar was successfully updated')),
    ),
  { functional: true },
);
