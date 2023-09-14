import { createSelector } from '@ngrx/store';

import { selectAuth } from '..';
import { User } from 'src/app/types/user';
import { ROLE } from 'src/app/utils/constants';

export const isLoading = createSelector(selectAuth, (state) => state.loading);
export const hasUser = createSelector(selectAuth, (state) => !!state.user);
export const user = createSelector(selectAuth, (state) => state.user as User);
export const checked = createSelector(selectAuth, (state) => state.checked);
export const isAdmin = createSelector(selectAuth, (state) => state.user?.role === ROLE.admin);
