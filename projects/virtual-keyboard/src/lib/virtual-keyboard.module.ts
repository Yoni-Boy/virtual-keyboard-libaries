//https://stackoverflow.com/questions/60102146/custom-library-component-is-not-a-known-element-but-app-compiles-and-runs


import { NgModule } from '@angular/core';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import { SearchResultComponent } from './extenders/search-result/search-result.component';
import {VirtualKeyboardEventsService} from './services/virtual-keyboard-events.service';
import { SearchResultService } from './extenders/search-result/search-result.service';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardLabelComponent } from './extenders/virtual-keyboard-label/virtual-keyboard-label.component';



@NgModule({
  declarations: [
    VirtualKeyboardComponent,
    SearchResultComponent,
    VirtualKeyboardLabelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VirtualKeyboardComponent,
    SearchResultComponent,
    VirtualKeyboardLabelComponent
  ],
  providers: [VirtualKeyboardEventsService,SearchResultService]
})
export class VirtualKeyboardModule { }




// import { NgModule } from '@angular/core';
// import { VirtualKeyboardComponent } from './virtual-keyboard.component';
// import {VirtualKeyboardEventsService} from './services/virtual-keyboard-events.service';
// import { CommonModule } from '@angular/common';
// import { SearchResultComponent } from '../public-api';


// @NgModule({
//   declarations: [
//     VirtualKeyboardComponent,
//   ],
//   imports: [
//     CommonModule,
//     SearchResultComponent
//   ],
//   exports: [
//     VirtualKeyboardComponent,
//     SearchResultComponent
//   ],
//   providers: [VirtualKeyboardEventsService]
// })
// export class VirtualKeyboardModule { }
