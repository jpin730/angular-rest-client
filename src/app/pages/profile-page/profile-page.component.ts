import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { fromAuth } from 'src/app/store/auth';
import { ROLE } from 'src/app/utils/constants';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  store = inject(Store);
  user$ = this.store.select(fromAuth.user);
  role = ROLE;
  file?: File;
  avatarPreview = '';

  submitFile() {
    const formData = new FormData();
    formData.append('file', this.file as File);
  }

  showFilePreview(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files.length) {
      this.file = files.item(0) as File;
      this.avatarPreview = URL.createObjectURL(this.file);
    }
  }
}
