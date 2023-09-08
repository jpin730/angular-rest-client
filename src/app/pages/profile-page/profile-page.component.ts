import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { fromAuth } from 'src/app/store/auth';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatIconModule],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  store = inject(Store);
  user$ = this.store.select(fromAuth.user);
}
