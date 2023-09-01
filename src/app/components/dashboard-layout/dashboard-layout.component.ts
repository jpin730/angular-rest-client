import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

import { SidenavListItem } from 'src/app/interfaces/SidenavListItem';
import { media } from 'src/utils/media';
import { BREAKPOINT } from 'src/utils/constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NgFor,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  pageTitle = 'Dashboard';
  isMobile = false;
  sidenavList: SidenavListItem[] = [
    { title: 'Dashboard', link: '/', icon: 'dashboard' },
    { title: 'Profile', link: '/profile', icon: 'account_circle' },
    { title: 'Users', link: '/users', icon: 'group' },
    { title: 'Categories', link: '/categories', icon: 'category' },
    { title: 'Products', link: '/products', icon: 'view_list' },
  ];
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  destroyed = new Subject<void>();

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
    this.router.navigateByUrl('/login');
  }
}
