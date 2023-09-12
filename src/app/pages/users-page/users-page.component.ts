import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';
import { fromUsers } from 'src/app/store/users';
import { DEBOUNCE_TIME, PAGINATOR_SIZE_OPTIONS, ROLE } from 'src/app/utils/constants';
import { debounceTime, map } from 'rxjs';
import { usersActions } from 'src/app/store/users/users.action';
import { UserEditorComponent } from 'src/app/components/user-editor/user-editor.component';
import { DialogData, DialogResult } from 'src/app/interfaces/user-editor';

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

  ngOnInit(): void {
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

  openUserEditor(editMode = false) {
    const dialogRef = this.dialog.open<UserEditorComponent, DialogData, DialogResult>(
      UserEditorComponent,
      { data: { editMode } },
    );

    dialogRef.afterClosed().subscribe((success) => success && this.fetchUsers());
  }
}
