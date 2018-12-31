import { Component, OnInit, Input } from '@angular/core';
import { GeneralUser } from 'src/app/models/generalUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-first-round-bidding-widget',
  templateUrl: './first-round-bidding-widget.component.html',
  styleUrls: ['./first-round-bidding-widget.component.css']
})
export class FirstRoundBiddingWidgetComponent implements OnInit {
  @Input('currentUser') currentUser: GeneralUser = new GeneralUser('', '');
  @Input('carPost') carPost: {} = {};


  initValue: number = 100;

  repetBidding: boolean = false;

  bidSubmited: boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.currentUser);
  }

  increasePrice(input) {
    this.initValue = parseInt(input.value) + 100;
  }
  decreasePrice(input) {
    this.initValue = parseInt(input.value) - 100;
  }

  submitBidding() {
    // 'lazy' check, since it's not necessary to have every card do the repetitive check due to init.
    console.log(this.currentUser);
    if (this.currentUser.biddingHistory) {
      Object.values(this.currentUser.biddingHistory).forEach(h => {
        if (this.carPost['postId'] === h['carId']) {
          this.repetBidding = true;
        }
      })
    }
    
    // repetBidding need to be observable checking..... 
    if (this.repetBidding) {
      // show the repetBidding condition message
      console.log('repet bidding');
      return;
    } else if (this.currentUser.biddingCounts <= 0) {
      console.log('counts less than or equal 0');
      return;
    } else if (!this.currentUser.allowBidding) {
      console.log('not allow bidding');
      return
    } else {

      const createdDate = new Date();
      let tmpBiddingCounts: number = this.currentUser.biddingCounts - 1;


      let biddingObject = {
        carId: this.carPost['postId'],
        biddingPrice: this.initValue + this.carPost['value']['currentPrice'],
        creationDateUTC: createdDate.toUTCString(),
        createdDateLocal: createdDate.toLocaleString()
      }

      this.userService.createBidding(this.currentUser.$uid, tmpBiddingCounts, biddingObject);

      this.bidSubmited = true;
    }




  }



}



  /**
   * 
   * all bidding conditions:
   * 
   * - Not Allow bidding:
   *    1. not loged in/not signed in/not member
   *    2. lack of biddingCounts
   *    3. suspended account
   *    4. have already bidded
   *    5. the status is processing
   * 
   * - Allow bidding:
   *    1. loged in
   *    2. enough bidding counts
   *    3. not repetitively bidding
   * 
   * - All biddingStatus mapped with conditions:
   *    1. active         => allow
   *    2. processing     => not allow
   *    3. finished       => not allow
   *    4. lackOfCounts   => not allow
   *    5. unallowed      => not allow
   * 
   * Seller & Buyer business logic:
   * 
   *  Seller: 
   *    - sellers are only allowed for pricing, not for scheduling test drive
   *    - sellers should have their own bidding data showed in database
   *    - sellers 
   * 
   * 
   * 
   */