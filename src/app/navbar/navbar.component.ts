import { switchMap } from 'rxjs/operators';
import { AuthService } from './../services/authentication/auth/auth.service';
import { GeneralUser } from './../models/generalUser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, EMPTY, of } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  generalUser: GeneralUser;
  userSubscription: Subscription;

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    // navbar needs authService to get user to display user name;
    this.auth.user$
      .pipe(
        switchMap(i => {
          if(i) return this.userService.getUser(i.uid)
          return of(null);
        })
      )
      .subscribe(genUser => {
        this.generalUser = genUser as GeneralUser;
        console.log(this.generalUser);
        // console.log('this is generaluser: ' + this.generalUser);
      })

  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }

}
