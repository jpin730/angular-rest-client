import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GetUsers } from 'src/app/interfaces/api-users-responses';
import { UserFormValue } from 'src/app/interfaces/user-editor-dialog';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    'Get Users': props<{ limit?: number; offset?: number }>(),
    'Get Users Success': props<GetUsers>(),
    'Get Users Failure': emptyProps(),
    'Search Users': props<{ query: string; limit?: number; offset?: number }>(),
    'Search Users Success': props<GetUsers>(),
    'Search Users Failure': emptyProps(),
    'Create User': props<UserFormValue>(),
    'Create User Success': emptyProps(),
    'Create User Failure': emptyProps(),
    'Edit User': props<UserFormValue & { id: string }>(),
    'Edit User Success': emptyProps(),
    'Edit User Failure': emptyProps(),
    'Reset Success Status': emptyProps(),
  },
});
