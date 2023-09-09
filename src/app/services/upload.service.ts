import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { PutUploadAvatar } from '../interfaces/api-upload-responses';
import { uploadActions } from '../store/upload/upload.action';
import { fromAuth } from '../store/auth';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private baseURL = `${environment.apiURL}/upload`;

  updateAvatar(body: FormData) {
    return this.store.select(fromAuth.user).pipe(
      take(1),
      switchMap(({ uid }) =>
        this.http
          .put<PutUploadAvatar>(`${this.baseURL}/avatar/${uid}`, body, {
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            tap((event) => {
              return (
                event.type === HttpEventType.UploadProgress &&
                this.store.dispatch(
                  uploadActions.setProgress({
                    progress: Math.round(100 * (event.loaded / (event?.total || 0))),
                  }),
                )
              );
            }),
          ),
      ),
    );
  }
}
