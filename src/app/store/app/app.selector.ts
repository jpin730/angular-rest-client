import { createSelector } from '@ngrx/store';

import { fromAuth } from '../auth';
import { fromUsers } from '../users';
import { fromCategories } from '../categories';
import { fromProducts } from '../products';

export const isLoading = createSelector(
  fromAuth.isLoading,
  fromUsers.isLoading,
  fromCategories.isLoading,
  fromProducts.isLoading,
  (...isLoadingStates) => isLoadingStates.includes(true),
);
