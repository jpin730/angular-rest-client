import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';
import { fromUsers } from 'src/app/store/users';
import { PAGINATOR_SIZE_OPTIONS, ROLE } from 'src/app/utils/constants';
import { PaginatorIntlService } from 'src/app/services/paginator-intl.service';
import { map } from 'rxjs';
import { userActions } from 'src/app/store/users/users.action';

const imports = [
  AsyncPipe,
  BoolIconDirective,
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
export class UsersPageComponent {
  private store = inject(Store);

  displayedColumns: string[] = ['avatar', 'email', 'username', 'role', 'google', 'actions'];
  usersState$ = this.store.select(fromUsers.state).pipe(
    map((state) => {
      const pageIndex = state.offset / state.limit;
      return { ...state, pageIndex };
    }),
  );
  adminRole = ROLE.admin;
  search = new FormControl('');
  searchFocus = false;
  pageSizeOptions = PAGINATOR_SIZE_OPTIONS;

  onChangePaginator({ pageSize, pageIndex }: PageEvent) {
    const offset = pageSize * pageIndex;
    this.store.dispatch(userActions.getUsers({ limit: pageSize, offset }));
  }
}
