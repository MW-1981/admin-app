import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  // getMembers(): Member[]{
  //   return MEMBERS
  // }

  // use async method by 'rxjs'
  getMembers(): Observable<Member[]>{
    return of(MEMBERS);
  }
}
