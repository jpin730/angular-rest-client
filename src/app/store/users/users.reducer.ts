import { createReducer, on } from '@ngrx/store';
import { GetUsers } from 'src/app/interfaces/api-users-responses';
import { userActions } from './users.action';

export interface UsersState extends GetUsers {
  loading: boolean;
}

export const initialUsersState: UsersState = {
  total: 0,
  limit: 0,
  offset: 0,
  users: [],
  loading: false,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(userActions.getUsers, (state) => ({ ...state, loading: true })),
  on(userActions.getUsersSuccess, (state, { users, limit, offset, total }) => ({
    ...state,
    loading: false,
    users,
    limit,
    offset,
    total,
  })),
  on(userActions.getUsersFailure, (state) => ({ ...state, loading: false })),
  on(userActions.searchUsers, (state) => ({ ...state, loading: true })),
  on(userActions.searchUsersSuccess, (state, { users, limit, offset, total }) => ({
    ...state,
    loading: false,
    users,
    limit,
    offset,
    total,
  })),
  on(userActions.searchUsersFailure, (state) => ({ ...state, loading: false })),
);
