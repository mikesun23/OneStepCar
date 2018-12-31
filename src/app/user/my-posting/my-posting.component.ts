import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { PostService } from './../../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { StorePostService } from './store-post.service';

@Component({
  selector: 'app-my-posting',
  templateUrl: './my-posting.component.html',
  styleUrls: ['./my-posting.component.css']
})
export class MyPostingComponent implements OnInit {

  user: firebase.User;
  postingList: {}[] = [];

  /**
   * step 1: get current user
   * step 2: retrieve user postID data from user database
   * step 3: according to the postID, retrieve data from post database
   * 
   * step 4: adjust user_data and post_data for display
   */


  constructor(
    private postService: PostService, 
    private storePostService: StorePostService,
    private route: ActivatedRoute,
    private router: Router) { 
    // TODO we can use route.paramMap to retrieve userId then get the userPostingData from database
    // but for clear and simple robust working solution, we are calling authService to directly get userId by subscribing. 
    // user paramMap is gurranty to get the uid, and its observable, we'll catch uid sooner or later
    // using firebase.auth().currentUser, not sure how it works and when will it return back.
    this.route.paramMap.subscribe(res => {
      console.log(res.get('userid'));
    })
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    if (this.user) {
      let userid = this.user.uid;
      this.postService.getPostingListByUserId(userid).subscribe(result => {
        this.postingList = result;
        console.log(result);
      });
    }
  }

  showSuggessionPrice() {
    
  }
  
  scheduleMeeting() {

  }


  editPosting() {

  }

  navToDetailPage(post) {
    this.storePostService.saveCurrentPost(post);
    this.router.navigate(['userAccountDetailPage', post['key']]);
  }





}



