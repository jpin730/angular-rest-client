import { ActionReducerMap } from '@ngrx/store';

import { AuthState, authReducer } from './auth/auth.reducer';
import { UploadState, uploadReducer } from './upload/upload.reducer';
import { RouterState, routerReducer } from '@ngrx/router-store';

export interface AppState {
  router: RouterState;
  auth: AuthState;
  upload: UploadState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  upload: uploadReducer,
};

export const selectAuth = (state: AppState) => state.auth;
export const selectUpload = (state: AppState) => state.upload;
