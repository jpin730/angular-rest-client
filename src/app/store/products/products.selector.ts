import { createSelector } from '@ngrx/store';
import { selectProducts } from '..';

export const isLoading = createSelector(selectProducts, (state) => state.loading);
export const state = createSelector(selectProducts, (state) => state);
export const success = createSelector(selectProducts, (state) => state.success);
