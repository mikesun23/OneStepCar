import { UserService } from './services/user/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {

    const firstTimeUser = this.auth.user$.subscribe(u => {
      if (u) {
        const checkNewUser = this.userService.getUserByUid(u.uid).subscribe(res => {
          // Note && TODO: could put it somewhere else that don't get called every time.
          // it shows that app.component will be called, every time user submit bidding
          // guessing the reason could be the update of userAccount which triggers app.component to reload
          // that is why this is get called.
          console.log('here is result: ' + res);
          if (res == null) {
            this.userService.create(u);
            checkNewUser.unsubscribe();
            firstTimeUser.unsubscribe();
          }
        })
      }
    })
  }


}
