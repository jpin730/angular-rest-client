import { ActionReducerMap } from '@ngrx/store';

import { AuthState, authReducer } from './auth/auth.reducer';
import { UploadState, uploadReducer } from './upload/upload.reducer';
import { RouterState, routerReducer } from '@ngrx/router-store';
import { UsersState, usersReducer } from './users/users.reducer';

export interface AppState {
  router: RouterState;
  auth: AuthState;
  upload: UploadState;
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  upload: uploadReducer,
  users: usersReducer,
};

export const selectAuth = (state: AppState) => state.auth;
export const selectUpload = (state: AppState) => state.upload;
export const selectUsers = (state: AppState) => state.users;
