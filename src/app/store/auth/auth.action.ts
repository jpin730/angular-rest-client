import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Authenticate: emptyProps(),
    'Authenticate Success': props<{ user: unknown }>(),
    'Authenticate Failure': emptyProps(),
    Logout: emptyProps(),
  },
});
