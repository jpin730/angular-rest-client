import { createReducer, on } from '@ngrx/store';
import { uploadActions } from './upload.action';

export interface UploadState {
  progress: number;
}

export const initialUploadState: UploadState = {
  progress: 0,
};

export const uploadReducer = createReducer(
  initialUploadState,
  on(uploadActions.uploadUserAvatarSuccess, (state) => ({
    ...state,
    subscription: null,
    progress: 0,
  })),
  on(uploadActions.uploadUserAvatarFailure, (state) => ({
    ...state,
    subscription: null,
    progress: 0,
  })),
  on(uploadActions.setProgress, (state, { progress }) => ({ ...state, progress })),
);
