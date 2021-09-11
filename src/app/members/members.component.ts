import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  selectedMember: Member;

  constructor(private memberService: MemberService) { }

  // componentが初期化されるタイミングで実行される
  ngOnInit(): void {
    this.getMembers();
  }

  onSelect(member: Member): void {
      this.selectedMember = member;
  }

  getMembers(): void {
  //   this.members = this.memberService.getMembers();
    this.memberService.getMembers() // Observable object
      .subscribe(members => this.members = members);
  }

}
