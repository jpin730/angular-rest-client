import { NgForOf, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Subject, filter, takeUntil } from 'rxjs';

import { FormFieldErrorsModule } from 'src/app/directives/form-field-errors/form-field-errors.module';
import { DialogData, DialogResult, UserForm } from 'src/app/interfaces/user-editor';
import { fromUsers } from 'src/app/store/users';
import { usersActions } from 'src/app/store/users/users.action';
import { ROLE, ROLE_OPTIONS } from 'src/app/utils/constants';

const imports = [
  FormFieldErrorsModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  NgForOf,
  ReactiveFormsModule,
  UpperCasePipe,
];

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports,
  templateUrl: './user-editor.component.html',
})
export class UserEditorComponent implements OnInit {
  private dialogRef: MatDialogRef<UserEditorComponent, DialogResult> = inject(MatDialogRef);
  private dialogData: DialogData = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });

    this.store
      .select(fromUsers.success)
      .pipe(
        takeUntil(this.destroyed),
        filter((success) => success),
      )
      .subscribe(() => {
        this.store.dispatch(usersActions.resetSuccessStatus());
        this.dialogRef.close(true);
      });
  }

  editMode = this.dialogData.editMode;
  userForm: UserForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: this.fb.control<ROLE>(ROLE.user, [Validators.required]),
  });
  roleOptions = ROLE_OPTIONS;

  saveUser() {
    if (this.userForm.invalid) return;

    this.store.dispatch(usersActions.createUser({ ...this.userForm.getRawValue() }));
  }
}
