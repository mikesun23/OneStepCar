export class GeneralUser {
  $uid: string = '';
  name: string = '';
  email: string = '';
  allowBidding: boolean = false;
  biddingCounts: number = 0;
  biddingHistory: {
    key: {
      carId: string,
      biddingPrice: number,
      userType: string
    }
  }[];

  constructor(userName: string, email: string) {
    this.name = userName;
    this.email = email;
  }

}