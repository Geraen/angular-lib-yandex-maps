import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[yaCustomPlacemark]'
})
export class CustomPlacemarkDirective {

  constructor(private elementRef:ElementRef, viewContainerRef: ViewContainerRef) {
    console.log(elementRef);
    console.log(viewContainerRef);
   }

}
