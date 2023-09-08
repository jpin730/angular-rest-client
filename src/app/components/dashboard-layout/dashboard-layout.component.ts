import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

import { SidenavListItem } from 'src/app/interfaces/side-nav-list-item';
import { media$ } from 'src/app/utils/media';
import { BREAKPOINT, SIDE_NAVE_LIST } from 'src/app/utils/constants';
import { Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/auth.action';
import { fromAuth } from 'src/app/store/auth';
import { User } from 'src/app/interfaces/user';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  NgFor,
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
  user!: User;
  pageTitle = 'Dashboard';
  isMobile = false;
  sidenavList = SIDE_NAVE_LIST;

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  constructor() {
    this.store
      .select(fromAuth.user)
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

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

  logout() {
    this.store.dispatch(authActions.logout({ user: this.user }));
  }
}
