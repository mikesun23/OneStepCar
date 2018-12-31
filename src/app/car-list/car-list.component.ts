import { switchMap } from 'rxjs/operators';
import { AuthService } from './../services/authentication/auth/auth.service';
import { GeneralUser } from './../models/generalUser';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  userObservable: Observable<GeneralUser>;
  cars: any[] = [];

  constructor(private postService: PostService, private userService: UserService, private auth: AuthService) {

    // used for post-card component, user information for bidding 
    this.userObservable = this.auth.user$
      .pipe(
        switchMap(i => {
          if(i) return this.userService.getUser(i.uid);
          return of(null);
        })
      );

    // for rendering listing page
    this.postService.getAll().subscribe(data => {
      this.cars = data;
    })
  }

  ngOnInit() {
  }

}
