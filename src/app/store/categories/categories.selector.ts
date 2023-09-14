import { createSelector } from '@ngrx/store';

import { selectCategories } from '..';

export const isLoading = createSelector(selectCategories, (state) => state.loading);
export const state = createSelector(selectCategories, (state) => state);
export const success = createSelector(selectCategories, (state) => state.success);
