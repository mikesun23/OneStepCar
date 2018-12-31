import { HomePageComponent } from './home/home-page/home-page.component';
import { MyBiddingComponent } from './user/my-bidding/my-bidding.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SellingPostStepperFormComponent } from './selling-post-stepper-form/selling-post-stepper-form.component';
import { LoginComponent } from './login/login.component';
import { MyPostingComponent } from './user/my-posting/my-posting.component';
import { PostListingPageComponent } from './post-listing-page/post-listing-page.component';

const appRoutes: Routes = [
  // {
  //   path: '**',
  //   component: AppComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: UserComponent,
  //       canActivate: [AuthGuard]
  //     },
  //     { path: 'postform', component: SellingPostStepperFormComponent },
  //     { path: 'carList', component: CarListComponent },
  //     { path: 'showCarList', component: CarListComponent }
  //   ]
  // },

  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'homePage', component: HomePageComponent },
      { path: 'postform', component: SellingPostStepperFormComponent },
      { path: 'showCarList', component: PostListingPageComponent },
      { path: 'myPosting/:userid', component: MyPostingComponent },
      { path: 'myBidding/:userid', component: MyBiddingComponent },
      { path: 'userAccountDetailPage/:postid', component: DetailPageComponent },
      { path: 'publicDetailPage/:postid', component: DetailPageComponent }
    ]
  },

  { path: 'login', component: LoginComponent }

  // implement signup component

]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
