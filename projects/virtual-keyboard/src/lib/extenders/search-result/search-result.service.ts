import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResultItem,SearchResultComponent } from '../../../public-api';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  
  private selectItemEventSubject = new BehaviorSubject<SearchResultItem | null>(null);
  private displayResultEventSubject = new BehaviorSubject<SearchResultComponent | null>(null);
  //This for update the 
  private updateResultEventSubject = new BehaviorSubject<SearchResultItem[] | null>(null);

 
  constructor() { }

  updateResultEvent(event: SearchResultItem[]) {
    this.updateResultEventSubject.next(event);
  }

  getUpdateResultEvent() {
    return this.updateResultEventSubject.asObservable();
  }


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

