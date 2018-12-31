import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { GeneralUser } from '../models/generalUser';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-listing-page',
  templateUrl: './post-listing-page.component.html',
  styleUrls: ['./post-listing-page.component.css']
})
export class PostListingPageComponent implements OnInit {

  postList: {}[] = [];
  currentUser: GeneralUser = new GeneralUser('', '');

  constructor(
    private postService: PostService,
    private userService: UserService,
    private auth: AuthService) {

    // change getAll method in postService to get all posts from waitingPool for now
    // waitingPool should be only used for waiting for approval, the actual post lists should be 
    // retrieved from approved pool. For now, using waiting pool for simplicity, will change in the future. 

    this.auth.user$.pipe(
      switchMap(i => {
        if (i) return this.userService.getUser(i.uid);
        return of(null);
      })
    )
      .subscribe(user => {
        this.currentUser = user;
      })

  }

  ngOnInit() {
    this.postService.getAllFromApprovedPool().subscribe(list => {

      let tmpPostList = [];

      for (let p of list) {
        Object.keys(p).forEach(key => {
          const data = { postId: key, value: p[key] };
          tmpPostList.push(data);
        })
      }

      this.postList = tmpPostList;

      console.log(this.postList);
    })
  }

  applyFilter(event) {
    console.log('filter works');
    console.log(event);

    if (event != undefined && event.length > 0) {
      this.postList = [];
      for (let path of event) {
        // {carMake, carYear, carModel, carTrim}

        // call the service and get back result, push/concat results into this.postlist
        this.postService.getPostsWithFullSearchPath(path).subscribe(data => {
          data.subscribe(d => {
            console.log(path);
            console.log(d);
            const newData = {postId: d['post_id'], value: d}
            this.postList.push(newData);
          })
        })

      }
    }



  }

}
