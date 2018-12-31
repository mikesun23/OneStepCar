import { AdminModule } from './admin/admin.module';
import { CarMakesDataService } from './services/carMakesDataService/car-makes-data.service';
import { CarObjectAssemble } from './models/reusable/CarObjectAssemble';
import { AuthService } from './services/authentication/auth/auth.service';
import { UserService } from './services/user/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatRadioModule} from '@angular/material/radio';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BuycarComponent } from './buycar/buycar.component';
import { SellComponent } from './sell/sell.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostService } from './services/post/post.service';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarWindowComponent } from './car-window/car-window.component';
import { BiddingComponent } from './bidding/bidding/bidding.component';
import { SellingPostFormComponent } from './selling-post-form/selling-post-form.component';
import { ObjectToFormGroupService } from './services/modelConvertor/objectToFormGroup/object-to-form-group.service';
import { SellingPostStepperFormComponent } from './selling-post-stepper-form/selling-post-stepper-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ObjectLiteralPipe } from './customizePipe/objectListeral/object-literal.pipe';
import { RemoveSpacePipe } from './customizePipe/removeSpace/remove-space.pipe';
import { ImagePostComponent } from './selling-post-stepper-form/image-post/image-post.component';
import { ImageObjPipe } from './customizePipe/imageObj/image-obj.pipe';
import { FinalReviewPageComponent } from './selling-post-stepper-form/final-review-page/final-review-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SellerNoteComponent } from './selling-post-stepper-form/seller-note/seller-note.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginTabComponent } from './navbar/login-tab/login-tab.component';
import { FirebaseUiAuthModule } from './/firebase-ui-auth.module';
import { MyPostingComponent } from './user/my-posting/my-posting.component';
import { StorePostService } from './user/my-posting/store-post.service';
import { PostListingPageComponent } from './post-listing-page/post-listing-page.component';
import { PostCardComponent } from './post-listing-page/post-card/post-card.component';
import { FilterBoxComponent } from './post-listing-page/filter-box/filter-box.component';
import { FirstRoundBiddingWidgetComponent } from './post-listing-page/post-card/first-round-bidding-widget/first-round-bidding-widget.component';
import { MyBiddingComponent } from './user/my-bidding/my-bidding.component';
import { HomePageComponent } from './home/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BuycarComponent,
    SellComponent,
    LoginComponent,
    SignupComponent,
    FilterBarComponent,
    CarListComponent,
    CarWindowComponent,
    BiddingComponent,
    SellingPostFormComponent,
    SellingPostStepperFormComponent,
    ObjectLiteralPipe,
    RemoveSpacePipe,
    ImagePostComponent,
    ImageObjPipe,
    FinalReviewPageComponent,
    DetailPageComponent,
    SellerNoteComponent,
    UserComponent,
    LoginTabComponent,
    MyPostingComponent,
    PostListingPageComponent,
    PostCardComponent,
    FilterBoxComponent,
    FirstRoundBiddingWidgetComponent,
    MyBiddingComponent,
    HomePageComponent
  ],

  imports: [
    MatRadioModule,
    PdfViewerModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),

    // put all other module here(order matters for routing purpose!!)
    AdminModule,
    AppRoutingModule,
    FirebaseUiAuthModule,
  ],

  exports: [
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],

  providers: [
    StorePostService,
    UserService,
    AuthService,
    PostService,
    CarObjectAssemble,
    ObjectToFormGroupService,
    CarMakesDataService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
