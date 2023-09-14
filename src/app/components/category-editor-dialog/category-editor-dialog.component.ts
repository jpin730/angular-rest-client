import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { CategoryEditorDialogData, CategoryForm } from 'src/app/types/category-editor-dialog';
import { categoriesActions } from 'src/app/store/categories/categories.action';

const imports = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-category-editor-dialog',
  standalone: true,
  imports,
  templateUrl: './category-editor-dialog.component.html',
})
export class CategoryEditorDialogComponent implements OnInit {
  private dialogData: CategoryEditorDialogData = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(Store);

  category = this.dialogData.category;
  editMode = !!this.category;
  categoryForm: CategoryForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.category && this.editMode) {
      const { name } = this.category;
      this.categoryForm.patchValue({ name });
    }
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;

    const categoryFormValue = this.categoryForm.getRawValue();

    if (this.editMode && this.category) {
      const editedCategory = { ...categoryFormValue, id: this.category._id };
      this.store.dispatch(categoriesActions.editCategory(editedCategory));
      return;
    }

    this.store.dispatch(categoriesActions.createCategory(categoryFormValue));
  }
}
