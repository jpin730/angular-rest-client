import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';
import { fromUsers } from 'src/app/store/users';
import { DEBOUNCE_TIME, PAGINATOR_SIZE_OPTIONS, ROLE } from 'src/app/utils/constants';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { debounceTime, map } from 'rxjs';
import { userActions } from 'src/app/store/users/users.action';

const imports = [
  AsyncPipe,
  BoolIconDirective,
  ClipboardModule,
  MatButtonModule,
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
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit {
  private store = inject(Store);

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
  pageSizeOptions = [1, ...PAGINATOR_SIZE_OPTIONS];

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
        ? userActions.searchUsers({ query, limit, offset })
        : userActions.getUsers({ limit, offset }),
    );
  }
}
