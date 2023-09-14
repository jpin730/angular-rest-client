import { ClipboardModule } from '@angular/cdk/clipboard';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
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

import { CategoryEditorDialogComponent } from 'src/app/components/category-editor-dialog/category-editor-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';
import { Category } from 'src/app/types/category';
import { CategoryEditorDialogData } from 'src/app/types/category-editor-dialog';
import { ConfirmDialogData, ConfirmDialogResult } from 'src/app/types/confirm-dialog';
import { fromCategories } from 'src/app/store/categories';
import { categoriesActions } from 'src/app/store/categories/categories.action';
import { DEBOUNCE_TIME, PAGINATOR_SIZE_OPTIONS } from 'src/app/utils/constants';

const imports = [
  AsyncPipe,
  BoolIconDirective,
  ClipboardModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
  ReactiveFormsModule,
  NgForOf,
  NgIf,
];

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports,
  templateUrl: './categories-page.component.html',
})
export class CategoriesPageComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  displayedColumns: string[] = ['name', 'username', 'actions'];
  paginator!: Pick<MatPaginator, 'length' | 'pageSize' | 'pageIndex'>;
  categories$ = this.store.select(fromCategories.state).pipe(
    map(({ categories, total, limit, offset }) => {
      this.paginator = { length: total, pageSize: limit, pageIndex: offset / limit };
      return new MatTableDataSource(
        categories.map(({ _id, name, user }) => ({ _id, name, username: user.username })),
      );
    }),
  );
  searchControl = new FormControl('', { nonNullable: true });
  pageSizeOptions = PAGINATOR_SIZE_OPTIONS;
  categoryEditorDialogRef?: MatDialogRef<CategoryEditorDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent, ConfirmDialogResult>;
  searchFocus = false;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });

    this.store
      .select(fromCategories.success)
      .pipe(
        takeUntil(this.destroyed),
        filter((success) => success),
      )
      .subscribe(() => {
        this.categoryEditorDialogRef?.close();
        this.confirmDialogRef?.close();
        this.fetchUsers();
        this.store.dispatch(categoriesActions.resetSuccessStatus());
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
        ? categoriesActions.searchCategories({ query, limit, offset })
        : categoriesActions.getCategories({ limit, offset }),
    );
  }

  openCategoryEditor(category?: Category) {
    this.categoryEditorDialogRef = this.dialog.open<
      CategoryEditorDialogComponent,
      CategoryEditorDialogData
    >(CategoryEditorDialogComponent, { data: { category } });
  }

  confirmDeletion({ name, _id: id }: Category) {
    const message = `Do you want to delete ${name}?`;
    this.confirmDialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, { data: { message } });

    this.confirmDialogRef
      .afterClosed()
      .pipe(
        tap((success) => success && this.store.dispatch(categoriesActions.deleteCategory({ id }))),
      )
      .subscribe();
  }
}
