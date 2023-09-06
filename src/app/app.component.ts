import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { authActions } from './store/auth/auth.action';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  template: '<router-outlet/><app-loader/>',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(
      localStorage.getItem('token')
        ? authActions.authenticate()
        : authActions.authenticateFailure(),
    );
  }
}
