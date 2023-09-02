import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { authActions } from './store/auth/auth.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(authActions.authenticate());
  }
}
