import { NgModule } from '@angular/core';

import { MatErrorDirective } from './mat-error.directive';
import { MatFormFieldDirective } from './mat-form-field.directive';

export const FormFieldErrorDirectives = [MatErrorDirective, MatFormFieldDirective];

@NgModule({
  declarations: [MatErrorDirective, MatFormFieldDirective],
  exports: [MatErrorDirective, MatFormFieldDirective],
})
export class FormFieldErrorsModule {}
