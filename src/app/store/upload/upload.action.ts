import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from 'src/app/types/user';

export const uploadActions = createActionGroup({
  source: 'Upload',
  events: {
    'Upload User Avatar': props<{ body: FormData }>(),
    'Upload User Avatar Success': props<{ user: User }>(),
    'Upload User Avatar Failure': emptyProps(),
    'Cancel User Avatar Upload': emptyProps(),
    'Set Progress': props<{ progress: number }>(),
  },
});
