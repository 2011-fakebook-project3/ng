import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutofocusDirective implements AfterContentInit {

    @Input() public appAutoFocus = false;

    public constructor(private el: ElementRef) {
    }

    public ngAfterContentInit() {

        setTimeout(() => {
            this.el.nativeElement.focus();
        }, 500);
    }
}