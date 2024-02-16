import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResultItem,SearchResultComponent } from '../../../public-api';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService<T> {
  
  private selectItemEventSubject = new BehaviorSubject<SearchResultItem<T> | null>(null);
  private displayResultEventSubject = new BehaviorSubject<SearchResultComponent<T> | null>(null);
  //This for update the 
  private updateResultEventSubject = new BehaviorSubject<SearchResultItem<T>[] | null>(null);

 
  constructor() { }

  updateResultEvent(event: SearchResultItem<T>[]) {
    this.updateResultEventSubject.next(event);
  }

  getUpdateResultEvent() {
    return this.updateResultEventSubject.asObservable();
  }


  selectItemEvent(event: SearchResultItem<T>) {
    this.selectItemEventSubject.next(event);
  }

  getSelectItemEvent() {
    return this.selectItemEventSubject.asObservable();
  }

  displaySearchResultEvent(event: SearchResultComponent<T>) {
    this.displayResultEventSubject.next(event);
  }

  getDisplaySearchResultEvent() {
    return this.displayResultEventSubject.asObservable();
  }
}

