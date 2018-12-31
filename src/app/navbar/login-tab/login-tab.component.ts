import { Component, OnInit, Input } from '@angular/core';
import { GeneralUser } from 'src/app/models/generalUser';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-tab',
  templateUrl: './login-tab.component.html',
  styleUrls: ['./login-tab.component.css']
})
export class LoginTabComponent implements OnInit {

  @Input('generalUser') generalUser: GeneralUser;
  userId: string = '1234';

  constructor(private authService: AuthService) {

  }

  async ngOnInit() {

    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
      
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
