import { Directive, ElementRef, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DECIMAL_REGEXP } from 'src/app/utils/constants';

interface RequiredLength {
  requiredLength: number;
  actualLength: number;
}

interface MinLengthError {
  minlength: RequiredLength;
}

interface Min {
  min: number;
  actual: number;
}

interface MinError {
  min: Min;
}

interface Pattern {
  actualValue: string;
  requiredPattern: string;
}

interface PatternError {
  pattern: Pattern;
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
        const { requiredLength } = (errors as MinLengthError).minlength;
        return `Field must have ${requiredLength} or more characters`;
      }
      case 'min': {
        const { min } = (errors as MinError).min;
        return `Field must be greater or equal to ${min}`;
      }

      case 'pattern': {
        const { requiredPattern } = (errors as PatternError).pattern;

        if (requiredPattern === DECIMAL_REGEXP.toString()) {
          return `Field must be a decimal number`;
        }
        return 'Field has incorrect format';
      }
      default:
        return '';
    }
  }
}
