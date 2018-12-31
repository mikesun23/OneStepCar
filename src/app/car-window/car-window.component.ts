import { GeneralUser } from './../models/generalUser';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../services/authentication/auth/auth.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-car-window',
  templateUrl: './car-window.component.html',
  styleUrls: ['./car-window.component.css']
})
export class CarWindowComponent implements OnInit {

  @Input('generalUserObservable') generalUserObservable: Observable<GeneralUser>;
  @Input('car') car;


  generalUser: GeneralUser;

  // input of user-bidded-list
  // decide rendering options for each card

  /**
   * rendering logic: 
   * 1. have to login, to show bidding section enabled
   * 
   */


  // apply to all car card
  disableUserType: boolean = true;
  disableBidding: boolean = true;
  biddingCounts: number = 0;

  // apply to each car card
  userType: string = null; // according to: user input: user has to interact with each car-window 
  initValue: number = 100; // according to: user input: user has to interact with each car-window
  biddingStatus: string = 'processing'; // user input
  submitted: boolean = false; // accotding to user input

  biddedCarIdList: string[] = [];

  generalUserSubsciption: Subscription;

  constructor(private userService: UserService) { }

  /**
   * 1. allow/not allow bidding
   * 2. biddingCounts
   * 3. null biddingHistory
   * 
   * all biddingStatus:
   * - active
   * - processing
   * - finished
   * - unallowed
   * - lackOfCounts
   */
  ngOnInit() {
    this.generalUserSubsciption = this.generalUserObservable.subscribe(u => {
      if (u) {
        this.generalUser = u;
        if (u.allowBidding) {
          if (u.biddingCounts > 0) {
            this.biddedCarIdList = Object.values(u.biddingHistory).map(x => x['biddingHistory']['carId']);
            this.disableBidding = false;
            this.disableUserType = false;
            this.biddingCounts = u.biddingCounts;
            this.biddingStatus = 'active';

          } else {
            this.biddingStatus = 'lackOfCounts';
          }
        } else {
          this.biddingStatus = 'unallowed';
        }
      }
    })

    console.log(this.biddingStatus);
  }

  changeUserType(type: string) {
    this.userType = type;
  }


  increasePrice(input) {
    this.initValue = parseInt(input.value) + 100;
  }

  decreasePrice(input) {
    this.initValue = parseInt(input.value) - 100;
  }

  submitBidding() {
    // check for repetitive bidding 
    // put the checking status in submition, its kind of 'lazy' idea
    // only check repetitive when the bid is about to submit. otherwise, all cards will render and check
    // no matter user submit or not. 
    
    for (let c of this.biddedCarIdList) {
      if (c === this.car['key']) {
        this.biddingStatus = 'biddedAlready';
      }
    }

    // if not repetitive bidding
    if (this.biddingStatus !== 'biddedAlready') {
      this.biddingCounts -= 1;
      let biddingHistory = {
        userType: this.userType,
        carId: this.car['key'],
        biddingPrice: this.initValue + this.car['data'].price
      }
      this.userService.createBidding(this.generalUser.$uid, this.biddingCounts, biddingHistory);
      this.biddingStatus = 'finished';
      this.submitted = true;
    }

    this.generalUserSubsciption.unsubscribe();


  }

}
