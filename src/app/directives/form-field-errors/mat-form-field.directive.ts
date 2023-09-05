import { AfterContentInit, ContentChild, Directive } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { filter } from 'rxjs';
import { AbstractControlDirective } from '@angular/forms';

import { MatErrorDirective } from './mat-error.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-form-field',
})
export class MatFormFieldDirective implements AfterContentInit {
  @ContentChild(MatFormFieldControl) formFieldControl!: MatFormFieldControl<unknown>;
  @ContentChild(MatErrorDirective) matError!: MatErrorDirective;
  private ngControl?: AbstractControlDirective;

  ngAfterContentInit(): void {
    this.ngControl = this.formFieldControl.ngControl as AbstractControlDirective;
    this.formFieldControl.stateChanges
      .pipe(filter(() => this.formFieldControl.errorState))
      .subscribe(() => this.matError?.setTextContent(this.ngControl && this.ngControl.errors));
  }
}
