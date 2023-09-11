import { AsyncPipe, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { fromAuth } from 'src/app/store/auth';
import { ROLE } from 'src/app/utils/constants';
import { uploadActions } from 'src/app/store/upload/upload.action';
import { fromUpload } from 'src/app/store/upload';
import { BoolIconDirective } from 'src/app/directives/bool-icon.directive';

const imports = [
  AsyncPipe,
  BoolIconDirective,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  NgIf,
];

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports,
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  store = inject(Store);

  file: File | null = null;
  adminRole = ROLE.admin;
  fileInputValue = '';
  avatarPreview = '';
  user$ = this.store.select(fromAuth.user).pipe(tap(() => this.clearPreview()));
  progress$ = this.store.select(fromUpload.progress);

  submitFile() {
    const body = new FormData();
    body.append('file', this.file as File);
    this.store.dispatch(uploadActions.uploadUserAvatar({ body }));
  }

  showFilePreview(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files.length) {
      this.file = files.item(0) as File;
      this.avatarPreview = URL.createObjectURL(this.file);
    }
  }

  clearPreview() {
    this.file = null;
    this.avatarPreview = '';
    if (this.fileInput) this.fileInput.nativeElement.value = '';
  }

  cancelFileUpload() {
    this.store.dispatch(uploadActions.cancelUserAvatarUpload());
  }
}
