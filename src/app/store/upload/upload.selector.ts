import { createSelector } from '@ngrx/store';

import { selectUpload } from '..';

export const progress = createSelector(selectUpload, (state) => state.progress);
