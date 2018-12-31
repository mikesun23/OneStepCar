
export interface GeneralPost{
    staticDetails: {
        // linked user
        userId: string;

        // linked car
        carId: string;

        // about time
        postTime: Date;
        expirationDate: Date; // may need to be changed to string?
        expirationDuration: string; // may need to change to number of hours/seconds/days/months?

    }

    statusDetails: {

        dealStatus: string; // should be enum: [available, processing, not available]
        biddingAmount: number; // overlapped with biddingDetails, need to refactor
        viewedAmount: number;
        savedAmount: number;

    }

    // TODO comeback latter, finish basic requirement. 
    biddingDetails: {
        
    }
}