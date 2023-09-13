import { createReducer, on } from '@ngrx/store';
import { GetUsers } from 'src/app/interfaces/api-users-responses';
import { usersActions } from './users.action';

export interface UsersState extends GetUsers {
  loading: boolean;
  success: boolean;
}

export const initialUsersState: UsersState = {
  total: 0,
  limit: 0,
  offset: 0,
  users: [],
  loading: false,
  success: false,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(usersActions.getUsers, (state) => ({ ...state, loading: true })),
  on(usersActions.getUsersSuccess, (state, { users, limit, offset, total }) => ({
    ...state,
    loading: false,
    users,
    limit,
    offset,
    total,
  })),
  on(usersActions.getUsersFailure, (state) => ({ ...state, loading: false })),
  on(usersActions.searchUsers, (state) => ({ ...state, loading: true })),
  on(usersActions.searchUsersSuccess, (state, { users, limit, offset, total }) => ({
    ...state,
    loading: false,
    users,
    limit,
    offset,
    total,
  })),
  on(usersActions.searchUsersFailure, (state) => ({ ...state, loading: false })),
  on(usersActions.createUser, (state) => ({ ...state, loading: true })),
  on(usersActions.createUserSuccess, (state) => ({ ...state, loading: false, success: true })),
  on(usersActions.createUserFailure, (state) => ({ ...state, loading: false })),
  on(usersActions.editUser, (state) => ({ ...state, loading: true })),
  on(usersActions.editUserSuccess, (state) => ({ ...state, loading: false, success: true })),
  on(usersActions.editUserFailure, (state) => ({ ...state, loading: false })),
  on(usersActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(usersActions.deleteUserSuccess, (state) => ({ ...state, loading: false, success: true })),
  on(usersActions.deleteUserFailure, (state) => ({ ...state, loading: false })),
  on(usersActions.resetSuccessStatus, (state) => ({ ...state, success: false })),
);
