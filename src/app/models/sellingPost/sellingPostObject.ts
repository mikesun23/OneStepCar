export class SellingPostObject {

  postObject: {
    // get back after push, so for listing the object
    post_id: string, // primary key
    user_id: string, // foreign key: user table/tree
    imageList_id: string,  // foreign key: images storage link

    // not considering right now
    biddingSection_id: string, // could be a link(id), create bidding table/tree

    // needed to be assigned
    status: string, // active, processing, inactive(expired, suspended)

    // formulated
    carData: {}, // all car specs

    // derived
    // geoLocation: {}, // longitude, latitude

    // derived
    geoAddress: {}, // state, city, zipcode, street

    // given
    period: {}, // available period

    // derived
    updateHistory: any[], // all patched value comes here, could be carData, could be price

    // derived
    priceHistory: any[], // should be extract from updateHistory

    // derived
    currentPrice: number // newest data from priceHitory
  };

  imageList: {}[] = [];

  constructor(
    init: {
      post_id: string,
      user_id: string,
      imageList_id: string,
      biddingSection_id: string,

      status: string,
      geoAddress: {},

      carData: {
        makeYear: {},
        basicInfo: {},
        detailInfo: {}
      },

      periodAndTime: {
        createdUTC: Date,
        createdLocal: string,
      },

      updateHistory: {}[],
      priceHistory: number[],
      currentPrice: number
    },
    imageList: {}[]) {
    this.postObject.user_id = init.user_id;
    this.postObject.post_id = init.post_id;
    this.postObject.imageList_id = init.imageList_id;
    this.postObject.biddingSection_id = init.biddingSection_id;

    this.postObject.status = init.status;
    this.postObject.geoAddress = init.geoAddress;
    this.postObject.carData = init.carData;
    this.postObject.period = init.periodAndTime;
    this.postObject.updateHistory = init.updateHistory;
    this.postObject.priceHistory = init.priceHistory;
    this.postObject.currentPrice = init.currentPrice;
    this.imageList = imageList;

    console.log(this.postObject);
  }

  postToDatabase() {
    // all the posting preprocessing comes here!!!
    
  }





}