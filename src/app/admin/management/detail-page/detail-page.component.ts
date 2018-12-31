import { StorePostService } from 'src/app/user/my-posting/store-post.service';
import { Component, OnInit } from '@angular/core';
import { ApprovedListingService } from '../../service/post/approvedList/approved-list.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  approved: boolean = false;

  carTitle: string = '2018 Bmw M3 Base Sedan';
  imageUrlList: string[] = [];

  basicInformation = {
    address: { key: 'Address', value: { address: '1390 Market St', city: 'San Francisco', state: 'CA', zipcode: '94102' } },
    mileage: { key: 'Milage', value: '6000' },
    vin: { key: 'VIN', value: 'WBS8M9C54J5J78414' },
    price: { key: 'Price', value: '62998' }
  };

  detailInformation = {
    exColor: { key: 'Exterior Color', value: 'black' },
    inColor: { key: 'Interior Color', value: 'black' },
    transmission: { key: 'Transmission', value: 'Manual' },
    cylinder: { key: 'Cylinder', value: '6-inline' },
    drivetrain: { key: 'Drivetrain', value: 'rear-wheel-drive' }
  };

  packageInformation = {
    'package1': true,
    'package2': true,
    'package3': false,
    'package4': true,
    'package5': false
  }

  constructor(private storePostService: StorePostService, private approvedListService: ApprovedListingService) { }

  ngOnInit() {

    if (this.storePostService.currentPost) {
      this.storePostService.currentPost.subscribe(params => {
        console.log(params);

        this.imageUrlList = params['imageUrlList'];

        this.carTitle = params['carData']['makeYear']['carYearControl'] + ' ' +
          params['carData']['makeYear']['carMakeControl'] + ' ' +
          params['carData']['basicInfo']['carModelControl'] + ' ' +
          params['carData']['basicInfo']['carTrimControl'] + ' ' +
          params['carData']['basicInfo']['carBodyStyleControl'];

        this.packageInformation = params['carData']['basicInfo']['carPackagesControl'];
        this.basicInformation.mileage.value = params['carData']['detailInfo']['carMileageControl'];
        this.basicInformation.price.value = params['carData']['detailInfo']['carPriceControl'];
        this.basicInformation.vin.value = params['carData']['detailInfo']['carVinControl'];
        this.basicInformation.address.value = params['carData']['detailInfo']['sellingAddressControl'];

        this.detailInformation.exColor.value = params['carData']['detailInfo']['carExColorControl'];
        this.detailInformation.inColor.value = params['carData']['detailInfo']['carInColorControl'];
        this.detailInformation.transmission.value = params['carData']['detailInfo']['carTransmissionControl'];
        this.detailInformation.cylinder.value = params['carData']['detailInfo']['carCylinderControl'];
        this.detailInformation.drivetrain.value = params['carData']['detailInfo']['carDrivetrainControl'];
      });
    }
  }

  approvePost() {
    this.storePostService.currentPost.subscribe(res => {
      console.log(res);
      this.approvedListService.approveWaitingPost(res);
      this.approved = true;

    })
  }



}
