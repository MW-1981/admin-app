import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @Input() member: Member;

  constructor(
    private route: ActivatedRoute, // URLのパラメータを取得する
    private memberService: MemberService,
    private location: Location // ブラウザバックやページ進む等の機能をAngularを通して使う
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    // +をつけることで数値に変換
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(id)
    .subscribe(member => this.member = member);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.memberService.updateMember(this.member)
    .subscribe(() => this.goBack());
  }

}
