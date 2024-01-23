import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResultItem,SearchResultComponent } from '../../../public-api';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  
  private selectItemEventSubject = new BehaviorSubject<SearchResultItem | null>(null);
  private displayResultEventSubject = new BehaviorSubject<SearchResultComponent | null>(null);
 
  constructor() { }


  selectItemEvent(event: SearchResultItem) {
    this.selectItemEventSubject.next(event);
  }

  getSelectItemEvent() {
    return this.selectItemEventSubject.asObservable();
  }

  displaySearchResultEvent(event: SearchResultComponent) {
    this.displayResultEventSubject.next(event);
  }

  getDisplaySearchResultEvent() {
    return this.displayResultEventSubject.asObservable();
  }
}

