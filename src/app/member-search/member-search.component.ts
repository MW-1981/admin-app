import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  members$: Observable<Member[]>;
  // to use Observable data
  private searchTerms = new Subject<string>(); // rxjs

  constructor(private memberService: MemberService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      // wait 300ms after keyboard input
      debounceTime(300),
      // do not proceed if search term is not changed
      distinctUntilChanged(),
      // when receive search term, it return the new Observable object
      switchMap((term: string) => this.memberService.searchMembers(term))
    )
  }

}
