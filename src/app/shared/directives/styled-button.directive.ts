import {
  Directive,
  HostBinding,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
} from '@angular/core';

type Mode = 'default' | 'danger' | 'modify' | 'draft';

@Directive({
  selector: '[pill-button]',
})
export class StyledButtonDirective implements OnInit {
  @Input('pill-button') mode: Mode = 'default';
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.addClass();
  }

  addClass() {
    this.renderer.addClass(this.el.nativeElement, this.mode);
  }

  @HostBinding('class.button-bg')
  get cssClasses() {
    return true;
  }
}
