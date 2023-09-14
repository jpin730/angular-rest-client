import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth.action';
import { User } from 'src/app/types/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
  checked: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  checked: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.authenticate, (state) => ({ ...state, loading: true })),
  on(authActions.authenticateSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    checked: true,
  })),
  on(authActions.authenticateFailure, (state) => ({
    ...state,
    user: null,
    loading: false,
    checked: true,
  })),
  on(authActions.login, (state) => ({ ...state, loading: true })),
  on(authActions.loginWithGoogle, (state) => ({ ...state, loading: true })),
  on(authActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(authActions.loginFailure, (state) => ({ ...state, user: null, loading: false })),
  on(authActions.setUser, (state, { user }) => ({ ...state, user })),
  on(authActions.logout, (state) => ({ ...state, user: null })),
);
