import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTerms = new Subject<string>();
  public searchTerms$ = this.searchTerms.asObservable();

  constructor() { }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

}
