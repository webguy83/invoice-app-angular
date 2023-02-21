import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStyledButton]',
})
export class StyledButtonDirective {
  constructor() {}

  @HostBinding('class.button-bg')
  get cssClasses() {
    return true;
  }
}
