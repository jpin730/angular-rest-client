import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';
import { fromUsers } from 'src/app/store/users';
import { DEBOUNCE_TIME, PAGINATOR_SIZE_OPTIONS, ROLE } from 'src/app/utils/constants';
import { Subject, debounceTime, filter, map, takeUntil, tap } from 'rxjs';
import { usersActions } from 'src/app/store/users/users.action';
import { UserEditorDialogComponent } from 'src/app/components/user-editor-dialog/user-editor-dialog.component';
import { UserEditorDialogData } from 'src/app/types/user-editor-dialog';
import { ConfirmDialogData, ConfirmDialogResult } from 'src/app/types/confirm-dialog';
import { User } from 'src/app/types/user';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

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
  NgIf,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports,
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  displayedColumns: string[] = ['avatar', 'email', 'username', 'role', 'google', 'actions'];
  paginator!: Pick<MatPaginator, 'length' | 'pageSize' | 'pageIndex'>;
  users$ = this.store.select(fromUsers.state).pipe(
    map(({ users, offset, limit, total }) => {
      this.paginator = { length: total, pageSize: limit, pageIndex: offset / limit };
      return new MatTableDataSource(users);
    }),
  );
  adminRole = ROLE.admin;
  searchControl = new FormControl('', { nonNullable: true });
  searchFocus = false;
  pageSizeOptions = PAGINATOR_SIZE_OPTIONS;
  userEditorDialogRef?: MatDialogRef<UserEditorDialogComponent>;
  confirmDialogRef?: MatDialogRef<ConfirmDialogComponent, ConfirmDialogResult>;

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
        this.userEditorDialogRef?.close();
        this.confirmDialogRef?.close();
        this.fetchUsers();
        this.store.dispatch(usersActions.resetSuccessStatus());
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
        ? usersActions.searchUsers({ query, limit, offset })
        : usersActions.getUsers({ limit, offset }),
    );
  }

  openUserEditor(user?: User) {
    this.userEditorDialogRef = this.dialog.open<UserEditorDialogComponent, UserEditorDialogData>(
      UserEditorDialogComponent,
      { data: { user } },
    );
  }

  confirmDeletion({ username, uid: id }: User) {
    const message = `Do you want to delete ${username}?`;
    this.confirmDialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, { data: { message } });

    this.confirmDialogRef
      .afterClosed()
      .pipe(tap((success) => success && this.store.dispatch(usersActions.deleteUser({ id }))))
      .subscribe();
  }
}
