import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { GeneralUser } from 'src/app/models/generalUser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminUser: GeneralUser = new GeneralUser('', '');

  constructor(private authService: AuthService, private userService: UserService) { 
    let user = firebase.auth().currentUser;

    this.userService.getUser(user.uid).subscribe(u => {
      this.adminUser = u as GeneralUser;
    })
  }

  ngOnInit() {
  }

}
