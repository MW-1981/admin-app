import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const members = [
      { id: 11, name: 'Bob' },
      { id: 12, name: 'Jack' },
      { id: 13, name: 'Simon' },
      { id: 14, name: 'Mathew' },
      { id: 15, name: 'Katy' },
      { id: 16, name: 'Gaga' },
      { id: 17, name: 'Elizabeth' },
      { id: 18, name: 'Michael' },
      { id: 19, name: 'Stacy' },
      { id: 20, name: 'Alex' }
    ]

    return { members };
  }

  genId(members: Member[]) : number {
    return members.length > 0 ? Math.max(...members.map(member => member.id)) + 1 : 11;
  }

}
