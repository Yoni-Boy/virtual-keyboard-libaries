import { Component } from '@angular/core';
import { VirtualKeyboardEventsService } from '../../../virtual-keyboard/src/public-api';

@Component({
  selector: 'vk-search-result',
  template: `
<vk-virtual-keyboard></vk-virtual-keyboard>    
    <p>
      search-result works!
    </p>
  `,
  styles: ``
})
export class SearchResultComponent {
  vvv : VirtualKeyboardEventsService | undefined

}
