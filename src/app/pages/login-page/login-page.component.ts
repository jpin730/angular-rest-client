import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const imports = [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports,
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder).nonNullable;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    // TODO: login
    // console.log(this.loginForm.value);
    // console.log(this.loginForm.controls.email.errors);
    // console.log(this.loginForm.controls.password.errors);
  }
}
