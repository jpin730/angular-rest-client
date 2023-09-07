import { createSelector } from '@ngrx/store';

import { selectAuth } from '..';
import { User } from 'src/app/interfaces/user';

export const isLoading = createSelector(selectAuth, (state) => state.loading);
export const hasUser = createSelector(selectAuth, (state) => !!state.user);
export const user = createSelector(selectAuth, (state) => state.user as User);
