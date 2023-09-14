import { NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';

import { FormFieldErrorsModule } from 'src/app/directives/form-field-errors/form-field-errors.module';
import { UserEditorDialogData, UserForm } from 'src/app/types/user-editor-dialog';
import { usersActions } from 'src/app/store/users/users.action';
import { PASSWORD_MIN_LENGTH, ROLE, ROLE_OPTIONS } from 'src/app/utils/constants';

const imports = [
  FormFieldErrorsModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  NgForOf,
  NgIf,
  ReactiveFormsModule,
  UpperCasePipe,
];

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports,
  templateUrl: './user-editor-dialog.component.html',
})
export class UserEditorDialogComponent implements OnInit {
  private dialogData: UserEditorDialogData = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(Store);

  user = this.dialogData.user;
  editMode = !!this.user;
  userForm: UserForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)]],
    role: this.fb.control<ROLE>(ROLE.user, [Validators.required]),
  });
  roleOptions = ROLE_OPTIONS;

  ngOnInit(): void {
    if (this.user && this.editMode) {
      const { email, username, role } = this.user;
      this.userForm.patchValue({ email, username, role });
      this.userForm.controls.password.setValidators(Validators.minLength(PASSWORD_MIN_LENGTH));
      this.userForm.controls.email.disable();
    }
  }

  saveUser() {
    if (this.userForm.invalid) return;

    const userFormValue = this.userForm.getRawValue();

    if (this.editMode && this.user) {
      const editedUser = { ...userFormValue, id: this.user.uid, email: this.user.email };
      this.store.dispatch(usersActions.editUser(editedUser));
      return;
    }

    this.store.dispatch(usersActions.createUser(userFormValue));
  }
}
