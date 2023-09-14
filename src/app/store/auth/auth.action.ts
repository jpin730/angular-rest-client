import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from 'src/app/types/user';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Authenticate: emptyProps(),
    'Authenticate Success': props<{ user: User }>(),
    'Authenticate Failure': emptyProps(),
    Login: props<{ email: string; password: string }>(),
    'Login with Google': props<{ id_token: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': emptyProps(),
    'Set User': props<{ user: User }>(),
    Logout: props<{ user: User }>(),
  },
});
