import { Directive, HostBinding, Input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appBoolIcon]',
  standalone: true,
})
export class BoolIconDirective {
  _value = false;
  matIcon: MatIcon = inject(MatIcon);
  @HostBinding('class.text-warn') isRed = true;
  @HostBinding('class.text-primary') isGreen = false;
  @Input() set appBoolIcon(value: boolean) {
    this.isGreen = value;
    this.isRed = !value;
    this.matIcon.fontIcon = value ? 'check_circle' : 'cancel';
  }
}
