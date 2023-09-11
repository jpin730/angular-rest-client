import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GetUsers } from 'src/app/interfaces/api-users-responses';

export const userActions = createActionGroup({
  source: 'Users',
  events: {
    'Get Users': props<{ limit?: number; offset?: number }>(),
    'Get Users Success': props<GetUsers>(),
    'Get Users Failure': emptyProps(),
    'Search Users': props<{ query: string; limit?: number; offset?: number }>(),
    'Search Users Success': props<GetUsers>(),
    'Search Users Failure': emptyProps(),
  },
});
