import { FormControl } from '@angular/forms';
import { ROLE } from '../utils/constants';

export interface DialogData {
  editMode: boolean;
}

export type DialogResult = true;

export interface UserForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<ROLE>;
}
