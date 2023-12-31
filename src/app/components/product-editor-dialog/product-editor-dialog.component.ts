import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { fromCategories } from 'src/app/store/categories';
import { categoriesActions } from 'src/app/store/categories/categories.action';
import { productsActions } from 'src/app/store/products/products.action';
import { ProductEditorDialogData, ProductForm } from 'src/app/types/product-editor-dialog';
import { FormFieldErrorsModule } from 'src/app/directives/form-field-errors/form-field-errors.module';
import { DECIMAL_REGEXP } from 'src/app/utils/constants';

const imports = [
  AsyncPipe,
  FormFieldErrorsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  NgForOf,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-product-editor-dialog',
  standalone: true,
  imports,
  templateUrl: './product-editor-dialog.component.html',
})
export class ProductEditorDialogComponent implements OnInit {
  private dialogData: ProductEditorDialogData = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(Store);

  product = this.dialogData.product;
  editMode = !!this.product;
  productForm: ProductForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.pattern(DECIMAL_REGEXP), Validators.min(0)]],
    inStock: [true],
  });

  categories$ = this.store.select(fromCategories.state).pipe(
    map(({ categories }) => {
      const mappedCategories = categories.map(({ _id, name }) => ({ value: _id, viewValue: name }));

      if (this.product) {
        const { _id: value, name: viewValue } = this.product.category;
        mappedCategories.unshift({ value, viewValue });
      }
      return mappedCategories;
    }),
  );

  ngOnInit(): void {
    this.store.dispatch(categoriesActions.getAllCategories());

    if (this.product && this.editMode) {
      const { name, category, price, inStock } = this.product;
      this.productForm.patchValue({ name, price, inStock, category: category._id });
    }
  }

  saveProduct() {
    if (this.productForm.invalid) return;

    const productFormValue = this.productForm.getRawValue();

    if (this.editMode && this.product) {
      const editedProduct = { ...productFormValue, id: this.product._id };
      this.store.dispatch(productsActions.editProduct(editedProduct));
      return;
    }

    this.store.dispatch(productsActions.createProduct(productFormValue));
  }
}
