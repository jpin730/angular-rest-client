import { NgForOf, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormFieldErrorsModule } from 'src/app/directives/form-field-errors/form-field-errors.module';
import { DialogData, DialogResult, UserForm } from 'src/app/interfaces/user-editor';
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
export class UserEditorComponent {
  private dialogRef: MatDialogRef<UserEditorComponent, DialogResult> = inject(MatDialogRef);
  private dialogData: DialogData = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder).nonNullable;

  editMode = this.dialogData.editMode;
  userForm: FormGroup<UserForm> = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: this.fb.control<ROLE>(ROLE.user, [Validators.required]),
  });
  roleOptions = ROLE_OPTIONS;

  saveUser() {
    if (this.userForm.invalid) return;

    // console.log(this.userForm.value);
    // TODO: dispatch CreateUser depending of editMode
    this.dialogRef.close(true);
  }
}
