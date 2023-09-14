import { FormControl, FormGroup } from '@angular/forms';

import { Category } from './category';

export interface CategoryEditorDialogData {
  category?: Category;
}

export type CategoryForm = FormGroup<{
  name: FormControl<string>;
}>;

export type CategoryFormValue = Pick<Category, 'name'>;
