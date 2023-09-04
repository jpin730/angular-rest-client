import { createSelector } from '@ngrx/store';

import { fromAuth } from '../auth';

export const isLoading = createSelector(fromAuth.isLoading, (...isLoadingStates) =>
  isLoadingStates.includes(true),
);
