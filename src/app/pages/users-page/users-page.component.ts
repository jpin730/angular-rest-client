import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromUsers } from 'src/app/store/users';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe], // TODO: Remove json pipe
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent {
  private store = inject(Store);

  usersState$ = this.store.select(fromUsers.state);
}
