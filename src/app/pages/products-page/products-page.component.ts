import { ClipboardModule } from '@angular/cdk/clipboard';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, filter, map, takeUntil, tap } from 'rxjs';

import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ProductEditorDialogComponent } from 'src/app/components/product-editor-dialog/product-editor-dialog.component';
import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';
import { fromProducts } from 'src/app/store/products';
import { productsActions } from 'src/app/store/products/products.action';
import { ConfirmDialogData, ConfirmDialogResult } from 'src/app/types/confirm-dialog';
import { Product } from 'src/app/types/product';
import { ProductEditorDialogData } from 'src/app/types/product-editor-dialog';
import { DEBOUNCE_TIME, PAGINATOR_SIZE_OPTIONS } from 'src/app/utils/constants';

const imports = [
  AsyncPipe,
  BoolIconDirective,
  ClipboardModule,
  CurrencyPipe,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
  NgIf,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports,
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'username', 'actions'];
  paginator!: Pick<MatPaginator, 'length' | 'pageSize' | 'pageIndex'>;
  products$ = this.store.select(fromProducts.state).pipe(
    map(({ products, total, limit, offset }) => {
      this.paginator = { length: total, pageSize: limit, pageIndex: offset / limit };
      return new MatTableDataSource(
        products.map(({ _id, name, category, price, inStock, user }) => ({
          _id,
          name,
          category,
          price,
          inStock,
          username: user.username,
        })),
      );
    }),
  );
  searchControl = new FormControl('', { nonNullable: true });
  pageSizeOptions = PAGINATOR_SIZE_OPTIONS;
  productEditorDialogRef?: MatDialogRef<ProductEditorDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent, ConfirmDialogResult>;
  searchFocus = false;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });

    this.store
      .select(fromProducts.success)
      .pipe(
        takeUntil(this.destroyed),
        filter((success) => success),
      )
      .subscribe(() => {
        this.productEditorDialogRef?.close();
        this.confirmDialogRef?.close();
        this.fetchUsers();
        this.store.dispatch(productsActions.resetSuccessStatus());
      });

    this.searchControl.valueChanges.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(() => {
      this.paginator.pageIndex = 0;
      this.fetchUsers();
    });
  }

  onChangePaginator({ pageSize, pageIndex, length }: PageEvent) {
    this.paginator = { pageSize, pageIndex, length };
    this.fetchUsers();
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  fetchUsers() {
    const query = this.searchControl.value.trim();
    const { pageSize: limit } = this.paginator;
    const offset = limit * this.paginator.pageIndex;
    this.store.dispatch(
      query
        ? productsActions.searchProducts({ query, limit, offset })
        : productsActions.getProducts({ limit, offset }),
    );
  }

  openProductEditor(product?: Product) {
    this.productEditorDialogRef = this.dialog.open<
      ProductEditorDialogComponent,
      ProductEditorDialogData
    >(ProductEditorDialogComponent, { data: { product } });
  }

  confirmDeletion({ name, _id: id }: Product) {
    const message = `Do you want to delete ${name}?`;
    this.confirmDialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, { data: { message } });

    this.confirmDialogRef
      .afterClosed()
      .pipe(tap((success) => success && this.store.dispatch(productsActions.deleteProduct({ id }))))
      .subscribe();
  }
}
