import { createSelector } from '@ngrx/store';
import { selectUsers } from '..';

export const isLoading = createSelector(selectUsers, (state) => state.loading);
export const state = createSelector(selectUsers, (state) => state);
