import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';

@Injectable({
  // root: can access this service from all this app.
  providedIn: 'root'
})
export class MemberService {

  constructor(private messageService: MessageService) { }

  // getMembers(): Member[]{
  //   return MEMBERS
  // }

  // use async method by 'rxjs'
  getMembers(): Observable<Member[]> {
    this.messageService.add("MemberService: Member list is loaded.");
    return of(MEMBERS);
  }

  getMember(id: number): Observable<Member> {
    this.messageService.add(`MemberService: Get Member data No. ${id}.`);
    return of(MEMBERS.find(member => member.id === id));
  }
}
