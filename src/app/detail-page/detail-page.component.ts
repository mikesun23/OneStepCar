import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { StorePostService } from '../user/my-posting/store-post.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  @Input('carMake') carMake: string = '';
  @Input('firstFormGroup') firstFormGroup;
  @Input('secondFormGroup') secondFormGroup;
  @Input('thirdFormGroup') thirdFormGroup;
  @Input('fourthInputGroup') fourthInputGroup = [{ image: './../../assets/porsche-GT3/porsche-gt3-2.jpg' }];

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



  constructor(private route: ActivatedRoute, private storePostService: StorePostService) {
  }

  // init all rendering values
  ngOnInit() {

    this.storePostService.currentPost.subscribe(params => {
      console.log(params);

      this.imageUrlList = params['value']['imageUrlList'];

      this.carTitle = params['value']['carData']['makeYear']['carYearControl'] + ' ' +
        params['value']['carData']['makeYear']['carMakeControl'] + ' ' +
        params['value']['carData']['basicInfo']['carModelControl'] + ' ' +
        params['value']['carData']['basicInfo']['carTrimControl'] + ' ' +
        params['value']['carData']['basicInfo']['carBodyStyleControl'];

      this.packageInformation = params['value']['carData']['basicInfo']['carPackagesControl'];
      this.basicInformation.mileage.value = params['value']['carData']['detailInfo']['carMileageControl'];
      this.basicInformation.price.value = params['value']['carData']['detailInfo']['carPriceControl'];
      this.basicInformation.vin.value = params['value']['carData']['detailInfo']['carVinControl'];
      this.basicInformation.address.value = params['value']['carData']['detailInfo']['sellingAddressControl'];

      this.detailInformation.exColor.value = params['value']['carData']['detailInfo']['carExColorControl'];
      this.detailInformation.inColor.value = params['value']['carData']['detailInfo']['carInColorControl'];
      this.detailInformation.transmission.value = params['value']['carData']['detailInfo']['carTransmissionControl'];
      this.detailInformation.cylinder.value = params['value']['carData']['detailInfo']['carCylinderControl'];
      this.detailInformation.drivetrain.value = params['value']['carData']['detailInfo']['carDrivetrainControl'];
    });



  }

  // to unsort object-literals
  controlGroupComparator(a, b) {
    return 0;
  }

}
