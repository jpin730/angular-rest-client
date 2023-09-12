import { FormControl, FormGroup } from '@angular/forms';
import { ROLE } from '../utils/constants';
import { User } from './user';

export interface DialogData {
  editMode: boolean;
  user?: User;
}

export type DialogResult = true;

export type UserForm = FormGroup<{
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<ROLE>;
}>;

export type UserFormValue = Pick<User, 'email' | 'username' | 'role'> & { password: string };
