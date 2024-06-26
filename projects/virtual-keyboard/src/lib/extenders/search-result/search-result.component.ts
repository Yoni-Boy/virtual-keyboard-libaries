import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { KeyboardLayout, VirtualKeyboardEventsService, SearchResultService, SearchResultItem, Position, VirtualKeyboardComponent } from "../../../public-api";

@Component({
  selector: 'vk-search-result',
  // template: `
  // <p>search-result works!</p>
  // <vk-virtual-keyboard [language]=language [vk_id]="vk_id"></vk-virtual-keyboard>
  // <div #div_search_result [class]="'simple-search-result'">
  // <ul class="typeahead typeahead-long dropdown-menu show" style="position:absolute;z-index:10000;" *ngIf="items">
  //     <ng-container *ngFor='let item of items;let j = index'>
  //         <li data-value="'{{item.text}}'" (click)="onSelectItemClick(item)"> 
  //             <a href = "#" class="dropdown-item btn-lg">
  //                 <strong>{{item.text}}</strong>
  //             </a>
  //         </li>
  //     </ng-container>
  // </ul>    
  // </div>
  // `
  //standalone: true,
  templateUrl: './search-result.component.html',
  //styleUrl: './search-result.component.css', 
  //imports: [VirtualKeyboardModule,CommonModule]
})
export class SearchResultComponent<T> {

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

  //We can delete this input, This parameter is no longer used
  @Input() validateCallBack!: (args: string) => boolean;
  //We can delete this input, This parameter is no longer used
  @Input() acceptCallBack!: (args: string) => boolean | void;
  //We can delete this input, This parameter is no longer used
  @Input() acceptWithIDCallBack!: (vk_id: string, text: string) => any | void;
  //This variable declare the search result list
  @Input() items: SearchResultItem<T>[] | undefined;
  //This value contain the search result div 
  @ViewChild('div_search_result') div_search_result!: ElementRef<HTMLDivElement>;
  //https://dev.to/chiangs/how-im-starting-my-own-angular-component-library-part-1---generic-button-3f3m
  //This event that come from the application, and deal with item selected click.
  //With this event we can declare the method that treatment with this event in the parent app 
  //@Output() itemSelectedClick: EventEmitter<SearchResultComponent<T>>;
  @Output() itemSelectedClick: EventEmitter<SearchResultItem<T>>;
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
  @Output() vkAcceptClick: EventEmitter<SearchResultComponent<T>>;
  //This for the keyboard position
  keyboardPosition!: Position;
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
  //When we are in the application layer and We want to perform a search for the value that entered in VK object
  //We will do this by listener to 'Accept' event and  catch him,
  //Then We will save the value of the search value right to search_key_value
  search_key_value: string | undefined;
  //Many times we want to read/write data from the Virtual Keyboard Component 
  //As for example when We selected an item from the search list,
  //We want this item to be entered inside the VK input filed
  vk: VirtualKeyboardComponent | undefined;

  constructor(private keyboardEventsService: VirtualKeyboardEventsService,
    private searchResultService: SearchResultService<T>) {
    var that = this;
    //This event responsible to show search result when We click on accept ket at VK
    this.keyboardEventsService.getAcceptEvent().subscribe(vk => {
      //When we click on 'accept' key we get the Virtual keyboard that type this key (there is many of VK) 
      //And We save its id value to know who is VK that makes the 'accept' click. 
      that._vk_id = vk?.vk_id;
      if (that.div_search_result != undefined) {
        //Here We save the search value key from VK to our object 
        that.search_key_value = vk?.input.value;
        //Here We save the VK that typing to make changes
        if (vk != null)
          this.vk = vk;
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



    this.keyboardPosition = {
      x: 0,
      y: 0
    }


    //this.itemSelectedClick = new EventEmitter<SearchResultComponent<T>>();
    this.itemSelectedClick = new EventEmitter<SearchResultItem<T>>();
    this.vkAcceptClick = new EventEmitter<SearchResultComponent<T>>();

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

  onSelectItemClick(item: SearchResultItem<T>) {
    //alert('You clicked: ' + item.text);
    //When We select item click, We trigger the select item event to dispatch this event and capture him in others application
    this.searchResultService.selectItemEvent(item);
    //this.itemSelectedClick.emit(this);
    this.itemSelectedClick.emit(item);
  }
  VKAcceptClicked(event: VirtualKeyboardComponent): void {
    this.vk = event;
    this.vkAcceptClick.emit(this);
  }

  // /**
  //    * This method responsible to calculate the virtual keyboard location.
  //    * For example: If We click on the input text element We wont to display the search result below to input text 
  //    * I don't know why when We adding the Search result component it show not correct.  
  //    */
  // calculationPosition(): void {
  //   //By the default, in the regular state We show the virtual keyboard below the input text 
  //   this.keyboardPosition.y = this.div_search_result.nativeElement.getBoundingClientRect().y + this.div_search_result.nativeElement.getBoundingClientRect().height;
  // }
  // /**
  //  * This method responsible to return the virtual keyboard width  
  //  */
  // getVK_Width(): number {
  //   return this.div_search_result.nativeElement.getBoundingClientRect().width;
  // }
  // /**
  //  * This method responsible to return the virtual keyboard height  
  //  */
  // getVK_Height(): number {
  //   return this.div_search_result.nativeElement.getBoundingClientRect().height;
  // }




}
