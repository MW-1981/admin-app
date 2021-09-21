import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  // root: can access this service from all this app.
  providedIn: 'root'
})
export class MemberService {

  private membersUrl = 'api/members';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // getMembers(): Member[]{
  //   return MEMBERS
  // }

  // use async method by 'rxjs'
  getMembers(): Observable<Member[]> {
    this.messageService.add("MemberService: Member list is loaded.");
    return this.http.get<Member[]>(this.membersUrl);
//    return of(MEMBERS); // rxjs
  }

  getMember(id: number): Observable<Member> {
    this.messageService.add(`MemberService: Get Member data No. ${id}.`);
    return of(MEMBERS.find(member => member.id === id));
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }
}
