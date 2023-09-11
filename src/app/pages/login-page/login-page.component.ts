import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { FormFieldErrorsModule } from 'src/app/directives/form-field-errors/form-field-errors.module';
import { GoogleClientLibrary } from 'src/app/interfaces/google-client-library';
import { authActions } from 'src/app/store/auth/auth.action';
import { BREAKPOINT } from 'src/app/utils/constants';
import { media$ } from 'src/app/utils/media';
import { environment } from 'src/environments/environment';

declare let google: GoogleClientLibrary;

const imports = [
  FormFieldErrorsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports,
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(Store);
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private destroyed = new Subject<void>();

  @ViewChild('googleButtonContainer') googleButtonContainer!: ElementRef<HTMLDivElement>;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroyed.next();
      this.destroyed.complete();
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
      callback: ({ credential }) => {
        this.ngZone.run(() => {
          this.loginWithGoogle(credential);
        });
      },
    });

    media$('min-width', BREAKPOINT.sm)
      .pipe(takeUntil(this.destroyed))
      .subscribe((matches) => {
        const width = matches ? 302 : 238;
        google.accounts.id.renderButton(this.googleButtonContainer.nativeElement, {
          width,
          locale: 'en',
        });
      });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.store.dispatch(authActions.login({ email, password }));
  }

  loginDemoUser() {
    this.loginForm.setValue({ email: 'user@email.com', password: '123456' });
    this.login();
  }

  private loginWithGoogle(id_token: string) {
    this.store.dispatch(authActions.loginWithGoogle({ id_token }));
  }
}
