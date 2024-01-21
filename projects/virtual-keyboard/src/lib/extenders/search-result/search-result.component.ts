import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { VirtualKeyboardModule,KeyboardLayout,VirtualKeyboardEventsService } from "../../../public-api";
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
  @Input() validateCallBack!: (args: string) => boolean;
  @Input() acceptCallBack!: (args: string) => boolean | void;
  @Input() acceptWithIDCallBack!: (vk_id: string,text: string) => any | void;
  searchDB: string[] = ['dsadsa','asdasa','aaaaa','vvvvv'];
  //This value contain the virtual keyboard div 
  @ViewChild('div_search_result') div_search_result!: ElementRef<HTMLDivElement>;


  constructor(private keyboardEventsService: VirtualKeyboardEventsService) 
  { 
      var that = this;
      //This event responsible to show search result when We click on accept ket at VK
      this.keyboardEventsService.getAcceptEvent().subscribe(vk => {
        if(that.div_search_result != undefined)
        {
          that.div_search_result.nativeElement.hidden = false;
        }
        if (vk != null) {
          //We show the only focus input keyboard component 
          //alert(vk.vk_id);
          //alert(vk.input.value);
        } 
      });
      // if(this.div_search_result != undefined)
      //   this.div_search_result.nativeElement.hidden = true;
   
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


}
