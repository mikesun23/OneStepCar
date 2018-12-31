import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-my-bidding',
  templateUrl: './my-bidding.component.html',
  styleUrls: ['./my-bidding.component.css']
})
export class MyBiddingComponent implements OnInit {

  user: firebase.User;

  constructor() { 
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
  }

}
