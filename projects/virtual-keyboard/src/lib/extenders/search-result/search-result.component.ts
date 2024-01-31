import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { VirtualKeyboardModule,KeyboardLayout,VirtualKeyboardEventsService, SearchResultService,SearchResultItem } from "../../../public-api";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'vk-search-result',
    standalone: true,
    templateUrl: './search-result.component.html',
    styleUrl: './search-result.component.css', 
    imports: [VirtualKeyboardModule,CommonModule]
})
export class SearchResultComponent {

  @Input() keyboardLayout: KeyboardLayout | undefined;
  @Input() language: string | undefined;
  //This variable declare the virtual keyboard id. 
  //With this parameter we notify the 'acceptWithIDCallBack' with this id param.
  //For example when we declare the call back method at the father, and we click on 'accept' button then we will 
  //Execute this method with this parameter. With this param We can know who is element. 
  @Input() vk_id: string | undefined;
  //We can delete this input, This parameter is no longer used
  @Input() validateCallBack!: (args: string) => boolean;
  //We can delete this input, This parameter is no longer used
  @Input() acceptCallBack!: (args: string) => boolean | void;
  //We can delete this input, This parameter is no longer used
  @Input() acceptWithIDCallBack!: (vk_id: string,text: string) => any | void;
  //This variable declare the search result list
  @Input() items: SearchResultItem[] |undefined;
  //This value contain the search result div 
  @ViewChild('div_search_result') div_search_result!: ElementRef<HTMLDivElement>;

  // First of all, you should know that I am dealing with a very complex problem
  // That occurs when we create several objects of 'SearchResultComponent' type.
  // The problem arises when we click on the 'accept' key button, an event called:
  // 1. acceptEvent is an event that occur when typing the 'accept' button
  // 2. displaySearchResultEvent is an event that takes place after pressing the 'accept' button 
  // And then We need to display a list of search results according to the value the user typed.
  // The problem is that since in the application layer we catch the events of displaySearchResultEvent, 
  // How do We know which search method to perform and which object to bind his search data to.
  // For example, when We declare two 'SearchResultComponent' objects in the application layer,
  // An object that searches for customers and an object that searches for products.
  // Therefore, in the application layer I need to identify the object and thus know which search to perform
  // And where to load the search results.
  // Therefore by the parameter _vk_id we will know who committed the event
  _vk_id: string | undefined;
  constructor(private keyboardEventsService: VirtualKeyboardEventsService,
    private searchResultService: SearchResultService) 
  { 
      var that = this;
      //This event responsible to show search result when We click on accept ket at VK
      this.keyboardEventsService.getAcceptEvent().subscribe(vk => {
        //When we click on 'accept' key we get the Virtual keyboard that type this key (there is many of VK) 
        //And We save its id value to know who is VK that makes the 'accept' click. 
        that._vk_id = vk?.vk_id;
        if(that.div_search_result != undefined)
        {
          //that.div_search_result.nativeElement.hidden = false;
          searchResultService.displaySearchResultEvent(that);
        }
        if (vk != null) {
          //We show the only focus input keyboard component 
          //alert(vk.vk_id);
          //alert(vk.input.value);
        } 
      });
      // if(this.div_search_result != undefined)
      //   this.div_search_result.nativeElement.hidden = true;

      
      //We disable this row 
      // this.searchResultService.getUpdateResultEvent().subscribe(items => {
      //   if (items != null) {
      //     this.items = items;
      //   } 
      // });


  }

    ngAfterViewInit(): void {
      this.div_search_result.nativeElement.hidden = true;
      
    }
    ngOnInit(): void {
      
      // var that = this;
      // this.keyboardEventsService.getAcceptEvent().subscribe(vk => {
      //   that.div_search_result.nativeElement.hidden = false;
      //   if (vk != null) {
      //     //We show the only focus input keyboard component 
      //     //alert(vk.vk_id);
      //     //alert(vk.input.value);
      //   } 
      // });
      // this.div_search_result.nativeElement.hidden = true;

  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    //In the default We wont to hide the search result.
    this.div_search_result.nativeElement.hidden = true;
  }

  onSelectItemClick(item: SearchResultItem ) {
    //alert('You clicked: ' + item.text);
    //When We select item click, We trigger the select item event to dispatch this event and capture him in others application
    this.searchResultService.selectItemEvent(item);
  }

}
