import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[styledInput]',
})
export class StyledInputDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.addClass();
  }

  addClass() {
    this.renderer.addClass(this.el.nativeElement, 'styled-input');
  }
}
