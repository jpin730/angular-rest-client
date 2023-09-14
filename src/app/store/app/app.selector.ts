import { createSelector } from '@ngrx/store';

import { fromAuth } from '../auth';
import { fromUsers } from '../users';
import { fromCategories } from '../categories';

export const isLoading = createSelector(
  fromAuth.isLoading,
  fromUsers.isLoading,
  fromCategories.isLoading,
  (...isLoadingStates) => isLoadingStates.includes(true),
);
