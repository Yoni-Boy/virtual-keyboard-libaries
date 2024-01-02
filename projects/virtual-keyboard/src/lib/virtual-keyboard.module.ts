import { NgModule } from '@angular/core';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import {VirtualKeyboardEventsService} from './services/virtual-keyboard-events.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    VirtualKeyboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VirtualKeyboardComponent
  ],
  providers: [VirtualKeyboardEventsService]
})
export class VirtualKeyboardModule { }
