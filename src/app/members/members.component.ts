import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
// import service
import { MemberService } from '../member.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];

  constructor(
    private memberService: MemberService,
  ) { }

  // called when this component is initialized.
  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
  //   this.members = this.memberService.getMembers();
    this.memberService.getMembers() // Observable object
      .subscribe(members => this.members = members);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    this.memberService.addMember({ name } as Member)
      .subscribe(member => {
        this.members.push(member);
      });
  }

  delete(member: Member): void {
    this.members = this.members.filter(m => m!== member);
    this.memberService.deleteMember(member).subscribe();
  }

}
