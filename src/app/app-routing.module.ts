import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { MembersComponent } from './members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

// route information
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: MemberDetailComponent },
  { path: 'members', component: MembersComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule // enable RouteModule for app.module.ts
  ]
})
export class AppRoutingModule { }
