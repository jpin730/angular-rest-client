import { createSelector } from '@ngrx/store';

import { fromAuth } from '../auth';
import { fromUsers } from '../users';

export const isLoading = createSelector(
  fromAuth.isLoading,
  fromUsers.isLoading,
  (...isLoadingStates) => isLoadingStates.includes(true),
);
