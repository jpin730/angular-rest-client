import { createSelector } from '@ngrx/store';

import { selectAuth } from '..';

export const isLoading = createSelector(selectAuth, (state) => state.loading);
export const hasUser = createSelector(selectAuth, (state) => !!state.user);
