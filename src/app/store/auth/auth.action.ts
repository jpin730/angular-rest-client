import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from 'src/app/interfaces/user';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Authenticate: emptyProps(),
    'Authenticate Success': props<{ user: User }>(),
    'Authenticate Failure': emptyProps(),
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': emptyProps(),
    Logout: emptyProps(),
  },
});
