import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

import { SidenavListItem } from 'src/app/interfaces/side-nav-list-item';
import { media } from 'src/app/utils/media';
import { BREAKPOINT, PATH } from 'src/app/utils/constants';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/auth.action';

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
  pageTitle = 'Dashboard';
  isMobile = false;
  sidenavList: SidenavListItem[] = [
    { title: 'Dashboard', link: PATH.home, icon: 'dashboard' },
    { title: 'Profile', link: PATH.profile, icon: 'account_circle' },
    { title: 'Users', link: PATH.users, icon: 'group' },
    { title: 'Categories', link: PATH.categories, icon: 'category' },
    { title: 'Products', link: PATH.products, icon: 'view_list' },
  ];
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });

    media('max-width', BREAKPOINT.md)
      .pipe(takeUntil(this.destroyed))
      .subscribe((matches) => {
        this.isMobile = matches;
      });
  }

  isActiveChange(isActive: boolean, item: SidenavListItem) {
    if (isActive) {
      this.pageTitle = item.title;
    }
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }
}
