import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { SidenavListItem } from 'src/app/types/side-nav-list-item';
import { media$ } from 'src/app/utils/media';
import { BREAKPOINT, PATH, SIDE_NAVE_LIST } from 'src/app/utils/constants';
import { Subject, map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/auth.action';
import { fromAuth } from 'src/app/store/auth';
import { User } from 'src/app/types/user';

const imports = [
  AsyncPipe,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  NgFor,
  NgIf,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
];

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports,
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  user$ = this.store.select(fromAuth.user);
  pageTitle = '';
  profilePath = PATH.profile;
  isMobile = false;
  sidenavList$ = this.store
    .select(fromAuth.isAdmin)
    .pipe(
      map((isAdmin) => (isAdmin ? SIDE_NAVE_LIST : SIDE_NAVE_LIST.filter(({ admin }) => !admin))),
    );

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });

    media$('min-width', BREAKPOINT.md)
      .pipe(takeUntil(this.destroyed))
      .subscribe((matches) => {
        this.isMobile = !matches;
      });
  }

  isActiveChange(isActive: boolean, item: SidenavListItem) {
    if (isActive) {
      this.pageTitle = item.title;
    }
  }

  logout(user: User) {
    this.store.dispatch(authActions.logout({ user }));
  }
}
