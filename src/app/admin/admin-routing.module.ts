import { DetailPageComponent } from './management/detail-page/detail-page.component';
import { ApprovedPostListComponent } from './management/sell/approved-post-list/approved-post-list.component';
import { WaitingPostListComponent } from './management/sell/waiting-post-list/waiting-post-list.component';
import { UserAccountComponent } from './management/user-account/user-account.component';
import { AdminAuthGuardGuard } from './../auth/adminAuthGuard/admin-auth-guard.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminAuthGuardGuard],
    canActivateChild: [AdminAuthGuardGuard],
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, outlet: 'admin' },
      { path: 'waitingPostList', component: WaitingPostListComponent, outlet: 'admin' },
      { path: 'approvedPostList', component: ApprovedPostListComponent, outlet: 'admin' },
      { path: 'userList', component: UserAccountComponent, outlet: 'admin' },
      { path: 'detailPage/:post_id', component: DetailPageComponent, outlet: 'admin' }
    ]

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
