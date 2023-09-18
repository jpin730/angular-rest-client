import { FormControl, FormGroup } from '@angular/forms';
import { Product } from './product';

export interface ProductEditorDialogData {
  product?: Product;
}

export type ProductForm = FormGroup<{
  name: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<number>;
  inStock: FormControl<boolean>;
}>;
