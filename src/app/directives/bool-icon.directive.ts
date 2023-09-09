import { Directive, HostBinding, Input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appBoolIcon]',
  standalone: true,
})
export class BoolIconDirective {
  _value = false;
  matIcon: MatIcon = inject(MatIcon);
  @HostBinding('class.text-red-700') isRed = true;
  @HostBinding('class.text-green-700') isGreen = false;
  @Input() set appBoolIcon(value: boolean) {
    this.isGreen = value;
    this.isRed = !value;
    this.matIcon.fontIcon = value ? 'check_circle' : 'cancel';
  }
}
