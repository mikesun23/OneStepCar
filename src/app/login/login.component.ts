import { AuthService } from './../auth/auth.service';
import { GeneralUser } from './../models/generalUser';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input('generalUser') generalUser: GeneralUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

  logout() {
    
  }


}
