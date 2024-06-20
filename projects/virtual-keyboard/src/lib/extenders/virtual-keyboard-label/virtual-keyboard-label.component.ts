import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { KeyboardHandlerEvent, KeyboardLayout, VirtualKeyboardComponent } from '../../../public-api';

@Component({
  selector: 'vk-label',
  templateUrl: './virtual-keyboard-label.component.html',
  styleUrl: './virtual-keyboard-label.component.css'
})
export class VirtualKeyboardLabelComponent {
  @Input() keyboardLayout: KeyboardLayout | undefined;
  @Input() language: string | undefined;
  //This variable declare the input text direction ('rtl','ltr')
  //The user can setting the input text direction 
  @Input() vk_dir: string = "ltr";
    //This variable declare us if we display the VK or not
  //For example if we have external keyboard and we don't wont the VK then we will set the variable to 'false'
  @Input() vk_is_visible: boolean = true;
  //This variable declare the input text if he readonly or not 
  @Input() vk_is_readonly: boolean = false;
  //This variable declare the virtual keyboard id. 
  //With this parameter we notify the 'acceptWithIDCallBack' with this id param.
  //For example when we declare the call back method at the father, and we click on 'accept' button then we will 
  //Execute this method with this parameter. With this param We can know who is element. 
  @Input() vk_id: string | undefined;
  //This variable declare the virtual keyboard value filed. 
  //For example when we wont to initialize the input text with value We can set the value with this variable.
  @Input() value_filed: string = '';
  //This variable declare the input text if We completely remove this element from the DOM tree. (true,false)
  //The user can setting the input text displaying  
  @Input() is_display_text_input: boolean = false;
  //Many times we want to read/write data from the Virtual Keyboard Component 
  //As for example when We selected an item from the search list,
  //We want this item to be entered inside the VK input filed
  vk: VirtualKeyboardComponent | undefined;
  //This event that come from the application, and deal with accept click.
  //With this event we can declare the method that treatment with this event in the parent app 
  //This vkAcceptClick help us to do couple of things,
  //I will explain why We declare this variable,
  //We defined the VK (sun) object inside the SVK (parent) object, 
  //There are some complex problems when defining an object inside an object and that is how to transfer variables as attributes to the sub-object (sun), 
  //Just non-complex variables I can simply define in the parent object and then pass them as parameters to the child object.
  //For example:
  //<vk-virtual-keyboard [language]=language [vk_id]="vk_id"></vk-virtual-keyboard>
  //We define @Input variables like 'language' in the same name in the parent and his child,  
  //But when I want to transfer a method (acceptClick)=... how do I do it ?,
  // I tried and failed, and only in the following way that I will explain I succeeded and that is:
  //In the child object we defined a parameter that behaves as an event: @Output() acceptClick: EventEmitter<VirtualKeyboardComponent>,
  // and also in the parent object I defined a parameter that behaves as an event:   @Output() vkAcceptClick: EventEmitter<SearchResultComponent<T>>  
  //Inside the parent we will define a method that handles the child event and all it does is dispatch to the application level of the event
  @Output() vkAcceptClick: EventEmitter<VirtualKeyboardComponent>;


  @ViewChild(VirtualKeyboardComponent) child:VirtualKeyboardComponent | undefined;

  constructor(){
    this.vkAcceptClick = new EventEmitter<VirtualKeyboardComponent>();
  }

  /**
   * Event Handler: KeyUp
   */
  handleKeyUp(event: KeyboardHandlerEvent): void {
    //alert('handleKeyUp');
    // this.input.focus();
    // this.caretEventHandler(event);

    // if (this.options.physicalKeyboardHighlight) {

    // }
    //alert('yes');
    this.is_display_text_input = !this.is_display_text_input;

    if(this.child!= undefined)
      {
        let event = new KeyboardEvent('mouseup',{'bubbles':true});
        let event_focus = new KeyboardEvent('focus',{'bubbles':true}); 
        //this.child._input.nativeElement.dispatchEvent(event_focus);
        //this.child.input.select();
        //alert('woo');
        //alert(this.child.getInput());
      }
  }
  
  VKAcceptClicked(event: VirtualKeyboardComponent): void {
    this.is_display_text_input = !this.is_display_text_input;
    this.value_filed = event.getInput();
    //this.vkAcceptClick.emit(event);
  }

}
