import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators'

@Injectable({
  // root: can access this service from all this app.
  providedIn: 'root'
})
export class MemberService {

  private membersUrl = 'api/members';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // getMembers(): Member[]{
  //   return MEMBERS
  // }

  // use async method by 'rxjs'
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(members => this.log('Retrieved Staff Data')),
        catchError(this.handleError<Member[]>('getMembers', []))
      );
//    return of(MEMBERS); // rxjs
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
    .pipe(
      tap(_ => this.log(`Retrieved Staff Data (id: ${id})`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
//    return of(MEMBERS.find(member => member.id === id));
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions)
    .pipe(
      tap(_ => this.log(`Staff Data ${member.id} is Updated`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions)
    .pipe(
      tap((newMember: Member) => this.log(`Staff Data ${newMember.id} is Added`)),
      catchError(this.handleError<Member>('addMember'))
    );
  }

  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions)
    .pipe(
      tap( _ => this.log(`Staff Data ${id} is Deleted`)),
      catchError(this.handleError<Member>('deleteMember'))
    )
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
