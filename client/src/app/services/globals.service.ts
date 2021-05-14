import { Injectable, ViewChild, EventEmitter, Output } from '@angular/core';

Injectable()
export class Globals {
   @Output() openSideNavRequestEvent = new EventEmitter();

   constructor() {
   }

   openSideNav() {
      this.openSideNavRequestEvent.emit();
   }
}
