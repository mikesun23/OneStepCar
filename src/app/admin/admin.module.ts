import { WaitingListService } from './service/post/waitingList/waiting-list.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ApprovedListingService } from './service/post/approvedList/approved-list.service';
import { UserAccountComponent } from './management/user-account/user-account.component';
import { ApprovedPostListComponent } from './management/sell/approved-post-list/approved-post-list.component';
import { WaitingPostListComponent } from './management/sell/waiting-post-list/waiting-post-list.component';
import { DetailPageComponent } from './management/detail-page/detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    UserAccountComponent,
    ApprovedPostListComponent,
    WaitingPostListComponent,
    DetailPageComponent,
  ],
  providers: [
    WaitingListService,
    ApprovedListingService
  ]
})
export class AdminModule { }
