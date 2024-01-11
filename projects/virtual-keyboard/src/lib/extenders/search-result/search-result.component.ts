import { Component, Input } from '@angular/core';
import { VirtualKeyboardModule } from "../../virtual-keyboard.module";
import { KeyboardLayout } from 'virtual-keyboard';

@Component({
    selector: 'vk-search-result',
    standalone: true,
    templateUrl: './search-result.component.html',
    styleUrl: './search-result.component.css',
    imports: [VirtualKeyboardModule]
})
export class SearchResultComponent {

  @Input() keyboardLayout: KeyboardLayout | undefined;
  @Input() language: string | undefined;
  //This variable declare the virtual keyboard id. 
  //With this parameter we notify the 'acceptWithIDCallBack' with this id param.
  //For example when we declare the call back method at the father, and we click on 'accept' button then we will 
  //Execute this method with this parameter. With this param We can know who is element    
  @Input() vk_id: string | undefined;
  @Input() validateCallBack!: (args: string) => boolean;
  @Input() acceptCallBack!: (args: string) => boolean | void;
  @Input() acceptWithIDCallBack!: (vk_id: string,text: string) => any | void;


}
