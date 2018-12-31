import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final-review-page',
  templateUrl: './final-review-page.component.html',
  styleUrls: ['./final-review-page.component.css']
})
export class FinalReviewPageComponent implements OnInit {
  @Input('carMake') carMake: string = '';
  @Input('firstFormGroup') firstFormGroup;
  @Input('secondFormGroup') secondFormGroup;
  @Input('thirdFormGroup') thirdFormGroup;
  @Input('fourthInputGroup') fourthInputGroup = [{ image: './../../assets/porsche-GT3/porsche-gt3-2.jpg' }];
  @Input('fifthInputGroup') fifthInputGroup;
  @Input('historyReportFile') historyReportFile;

  // rendering variable
  displayReport: boolean = false;

  // init data
  carTitle: string = '2018 Bmw M3 Base Sedan';
  historyReportDisplay: string = '';


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

  sellerNotes = {
    titleStatus: { key: 'Vehicle Title Status', value: 'inhand' },
    conditions: { key: 'General Conditions', value: { wearOff: 'new tires', exDamage: 'no scratches' } },
    warranty: { key: 'Warranty', value: 'Valid through Oct 2021' },
    maintenance: { key: 'Maintenance Plan', value: '4 years through Oct 2021 50k miles' },
    modifications: {
      key: 'Modifications', value: [
        { name: 'Js Racing exhaust', originalPrice: 946, sellingOrKeeping: 'sell', sellingPrice: 800 },
        { name: 'Js Racing Carbon Fiber spoiler', originalPrice: 1488, sellingOrKeeping: 'sell', sellingPrice: 1000 }
      ]
    },
    buyReason: { key: 'Purchase Reason', value: 'Awesome car!' },
    sellReason: { key: 'Sell Reason', value: 'Moving out of state.' },
    remoteSell: { key: 'Remote Sell', value: 'I can do up $500 for transportation.' },
    sellingPoints: { key: 'Special Features', value: ['sporty', 'comfortable', 'practical'] },
    extraNote: { key: 'Extra Note', value: 'If you love BMW, you must have this one.' }
  }



  constructor() { }

  // init all rendering values
  ngOnInit() {
    if (this.firstFormGroup && this.secondFormGroup && this.thirdFormGroup && this.fifthInputGroup) {
      this.carTitle = this.firstFormGroup['carYearControl'] + ' ' +
        this.carMake + ' ' +
        this.secondFormGroup['carModelControl'] + ' ' +
        this.secondFormGroup['carTrimControl'] + ' ' +
        this.secondFormGroup['carBodyStyleControl'];

      this.packageInformation = this.secondFormGroup['carPackagesControl']


      this.basicInformation.mileage.value = this.thirdFormGroup['carMileageControl'];
      this.basicInformation.price.value = this.thirdFormGroup['carPriceControl'];
      this.basicInformation.vin.value = this.thirdFormGroup['carVinControl'];
      this.basicInformation.address.value = this.thirdFormGroup['sellingAddressControl'];

      this.detailInformation.exColor.value = this.thirdFormGroup['carExColorControl'];
      this.detailInformation.inColor.value = this.thirdFormGroup['carInColorControl'];
      this.detailInformation.transmission.value = this.thirdFormGroup['carTransmissionControl'];
      this.detailInformation.cylinder.value = this.thirdFormGroup['carCylinderControl'];
      this.detailInformation.drivetrain.value = this.thirdFormGroup['carDrivetrainControl'];

      if (this.historyReportFile !== undefined) {
        let x: string = this.historyReportFile;
        console.log(x);
        this.historyReportDisplay = this.historyReportFile;
      }

      // this.sellerNotes = this.fifthInputGroup;
      Object.keys(this.sellerNotes).forEach(k => {
        // console.log(k + ' ' + this.sellerNotes[k]);
        this.sellerNotes[k].value = this.fifthInputGroup[k];
      });
    }
  }

  // rendering methods
  toggleReport() {
    this.displayReport = !this.displayReport;
  }

  // to unsort object-literals
  controlGroupComparator(a, b) {
    return 0;
  }


}
