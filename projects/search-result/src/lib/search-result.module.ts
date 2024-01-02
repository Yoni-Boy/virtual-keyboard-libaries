import { NgModule } from '@angular/core';
//import { VirtualKeyboardComponent } from './virtual-keyboard.component';
//import {VirtualKeyboardEventsService} from './services/virtual-keyboard-events.service';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardModule } from '../../../virtual-keyboard/src/lib/virtual-keyboard.module';
import { SearchResultComponent } from './search-result.component';
//import { VirtualKeyboardComponent, VirtualKeyboardEventsService } from '../../../virtual-keyboard/src/public-api';



@NgModule({
  declarations: [
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    VirtualKeyboardModule
    
  ],
  exports: [
  ],
  providers: []
})
export class SearchResultModule { }
