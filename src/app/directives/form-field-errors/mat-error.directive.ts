import { Directive, ElementRef, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

interface RequiredLength {
  requiredLength: number;
  actualLength: number;
}

interface MinLength {
  minlength: RequiredLength;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-error',
})
export class MatErrorDirective {
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);

  setTextContent(errors?: ValidationErrors | null) {
    if (!errors) return;

    this.el.nativeElement.textContent = this.parseErrors(errors);
  }

  private parseErrors(errors: ValidationErrors): string {
    const error = Object.keys(errors).at(0);
    switch (error) {
      case 'required':
        return 'Field is required';
      case 'email':
        return 'Email format is invalid';
      case 'minlength': {
        const { requiredLength } = (errors as MinLength).minlength;
        return `Field must have ${requiredLength} or more characters`;
      }
      default:
        return '';
    }
  }
}
