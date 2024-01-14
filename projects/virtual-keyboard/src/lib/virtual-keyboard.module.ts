import { NgModule } from '@angular/core';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import {VirtualKeyboardEventsService} from './services/virtual-keyboard-events.service';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from '../public-api';
//https://stackoverflow.com/questions/60102146/custom-library-component-is-not-a-known-element-but-app-compiles-and-runs


@NgModule({
  declarations: [
    VirtualKeyboardComponent,
  ],
  imports: [
    CommonModule,
    SearchResultComponent
  ],
  exports: [
    VirtualKeyboardComponent,
    SearchResultComponent
  ],
  providers: [VirtualKeyboardEventsService]
})
export class VirtualKeyboardModule { }
