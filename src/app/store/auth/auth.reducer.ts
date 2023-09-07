import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth.action';
import { User } from 'src/app/interfaces/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.authenticate, (state) => ({ ...state, loading: true })),
  on(authActions.authenticateSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(authActions.authenticateFailure, (state) => ({ ...state, user: null, loading: false })),
  on(authActions.login, (state) => ({ ...state, loading: true })),
  on(authActions.loginWithGoogle, (state) => ({ ...state, loading: true })),
  on(authActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(authActions.loginFailure, (state) => ({ ...state, user: null, loading: false })),
  on(authActions.logout, (state) => ({ ...state, user: null })),
);
