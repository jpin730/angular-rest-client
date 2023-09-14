import { FormControl, FormGroup } from '@angular/forms';

import { Category } from './category';

export interface CategoryEditorDialogData {
  editMode: boolean; // TODO: refactor to remove this prop
  category?: Category;
}

export type CategoryForm = FormGroup<{
  name: FormControl<string>;
}>;

export type CategoryFormValue = Pick<Category, 'name'>;
