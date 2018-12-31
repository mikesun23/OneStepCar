import { PostService } from './../services/post/post.service';
import { AuthService } from './../services/authentication/auth/auth.service';
import { BodyStyle } from './../models/sellingPost/bodyStyle';
import { CarMakes } from './../models/sellingPost/carMakes';
import { CarMakesDataService } from './../services/carMakesDataService/car-makes-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FiftyStates } from '../models/sellingPost/US_states';

@Component({
  selector: 'app-selling-post-stepper-form',
  templateUrl: './selling-post-stepper-form.component.html',
  styleUrls: ['./selling-post-stepper-form.component.css']
})
export class SellingPostStepperFormComponent implements OnInit {
  // static assets: USA states
  allStates: {}[] = new FiftyStates().getAll();


  allInputsReadyFlag: boolean = false;

  carMakes: {} = new CarMakes().getMakes();
  mappedModelAndTrim: { key: string; data: any; }[] = [];
  trimCombinations: {}[] = [];
  bodyStyle: string[] = new BodyStyle().getDefault();
  mappedPackages: {}[] = [];


  // FormControls: 
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthInputGroup: {}[] = [];
  fifthInputGroup: {} = {};
  historyReportFileUint: Uint8Array;

  historyReportFileBuffer: ArrayBuffer;

  //  Make Control
  carMakeControl: FormControl = new FormControl('', [Validators.required]);
  selectedMake: {} = {};

  //  Year Control
  carYearControl = new FormControl('', [Validators.required]);

  // --------------Model & trim & body-style
  carModelControl = new FormControl('', [Validators.required]);
  carTrimControl = new FormControl('', [Validators.required]);
  carBodyStyleControl = new FormControl('', [Validators.required]);
  carPackagesControl = new FormGroup({}, [Validators.required]);


  // Detail information:
  sellingAddressControl = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required])
  });
  carExColorControl = new FormControl('', [Validators.required]); // input literal
  carInColorControl = new FormControl('', [Validators.required]); // input literal 
  carTransmissionControl = new FormControl('', [Validators.required]);  // dropdown
  carDrivetrainControl = new FormControl('', [Validators.required]); // dropdown
  carCylinderControl = new FormControl('');  // dropdown

  carMileageControl = new FormControl('', [Validators.required, Validators.max(200000), Validators.min(0)]);  // input number
  carVinControl = new FormControl('', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]);  // input mix alphabetic
  carPriceControl = new FormControl('', [Validators.required, Validators.min(1000)]); // input number

  userid: string = '';

  imageTestUrl: any;

  constructor(private _formBuilder: FormBuilder, private carMakesService: CarMakesDataService,
    private auth: AuthService, private postService: PostService) {
    this.auth.user$.subscribe(user => {
      this.userid = user.uid;
    })
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      carMakeControl: this.carMakeControl,
      carYearControl: this.carYearControl
    });
    this.secondFormGroup = this._formBuilder.group({
      carModelControl: this.carModelControl,
      carTrimControl: this.carTrimControl,
      carBodyStyleControl: this.carBodyStyleControl,
      carPackagesControl: this.carPackagesControl
    });
    this.thirdFormGroup = this._formBuilder.group({
      sellingAddressControl: this.sellingAddressControl,
      carExColorControl: this.carExColorControl,
      carInColorControl: this.carInColorControl,

      carTransmissionControl: this.carTransmissionControl,
      carCylinderControl: this.carCylinderControl,
      carDrivetrainControl: this.carDrivetrainControl,

      carMileageControl: this.carMileageControl,
      carVinControl: this.carVinControl,
      carPriceControl: this.carPriceControl
    })


  }

  controlGroupComparator(a, b) {
    return 0;
  }

  // Step 1 selection interactions: Make & Year 
  makeSelected() {
    this.carYearControl.reset();
    this.selectedMake = this.carMakes[this.carMakeControl.value];
    console.log(this.selectedMake);
  }

  submitStep1MakeAndYear() {
    // get model, trim, bodyStyle data from database
    if (this.carMakeControl.value !== '' && this.carYearControl.value !== '') {
      this.carMakesService.getModelListWithYearAndMake(this.carMakeControl.value, this.carYearControl.value)
        .subscribe(data => {
          this.mappedModelAndTrim = data;
        });

    }
    // console.log(this.firstFormGroup.value);
  }

  // Step 2 selection interaction: Model & trim & bodystyle
  modelSelected(series: string) {
    // reset everything
    this.trimCombinations = [];
    this.bodyStyle = [];
    this.mappedPackages = [];

    this.carTrimControl.reset();
    this.carBodyStyleControl.reset();
    this.carPackagesControl.reset();

    for (let s of this.mappedModelAndTrim) {
      if (s.key === series) {
        for (let trim in s.data) {
          this.trimCombinations.push({ key: trim, packages: s.data[trim]['packages'] })
        }
      }
    }
  }

  trimSelected(trim) {

    this.bodyStyle = [];
    this.mappedPackages = [];

    this.carBodyStyleControl.reset();
    this.carPackagesControl.reset();

    let localStyleArray = [];
    switch (this.carMakeControl.value) {
      case 'BMW': localStyleArray = new BodyStyle().bmwBodyStyle; break;
      case 'Porsche': localStyleArray = new BodyStyle().porscheBodyStyle; break;
      case 'Audi': localStyleArray = new BodyStyle().audiBodyStyle; break;
      case 'MercedesBenz': localStyleArray = new BodyStyle().mercedesBenBodyStyle; break;
    }

    let trimNameArray = trim.split("-");
    let bodyStyleByTrim = []
    if (trimNameArray.length > 1) {
      for (let token of trimNameArray) {
        for (let style of localStyleArray) {
          if (token.toLowerCase() === style.toLowerCase()) {
            bodyStyleByTrim.push(style)
          }
        }
      }
    }

    if (bodyStyleByTrim.length > 1) {
      this.bodyStyle = [bodyStyleByTrim.join('-')];
    } else if (bodyStyleByTrim.length == 1) {
      this.bodyStyle = bodyStyleByTrim;
    } else {
      this.bodyStyle = localStyleArray;
    }

    // packages:
    for (let t of this.trimCombinations) {
      if (t['key'] === trim) {
        this.packagesFormGroupInit(t['packages']);
        break;
      }
    }
  }

  packagesFormGroupInit(packages: {}[]) {
    if (packages != undefined) {

      this.mappedPackages = packages;
      let packageKeys = packages.map(a => Object.keys(a)[0]);
      let group = {};

      for (let x of packageKeys) {
        group[x] = new FormControl(false);
      }
      this.carPackagesControl = new FormGroup(group);
      this.secondFormGroup.controls['carPackagesControl'] = new FormGroup(group);
    }
  }

  packagesSelected(event, checkedPackage) {
    if (event.checked) {
      this.carPackagesControl.patchValue({
        [checkedPackage]: true
      })
    } else {
      this.carPackagesControl.patchValue({
        [checkedPackage]: false
      })
    }
  }

  goBackToStep1() {
    // reset redering data to empty

    this.trimCombinations = [];
    this.mappedModelAndTrim = [];
    this.bodyStyle = [];
    this.mappedPackages = [];

    // reset current step2 formControls
    this.carModelControl.reset();
    this.carTrimControl.reset();
    this.carBodyStyleControl.reset();
    this.carPackagesControl.reset();

  }

  submitStep2ModelTrimBodyStyle() {
    this.secondFormGroup.patchValue({
      carPackagesControl: this.carPackagesControl
    })
    // console.log(this.secondFormGroup.value);
  }

  getAddressDetailNotice() {

  }

  submitStep3DetailInformation() {
    // console.log(this.thirdFormGroup.value);
  }

  submitStep4ImageList(event) {
    // console.log(event);
    this.fourthInputGroup = event;
  }

  submitSellerNote(event) {
    this.fifthInputGroup = event;
    this.allInputsReadyFlag = true;
    console.log(this.fifthInputGroup);
    console.log(this.thirdFormGroup.value);
  }

  submitHistoryReport(event) {
    if (event !== undefined || event !== null || event !== '') {
      this.historyReportFileBuffer = event;
      this.historyReportFileUint = new Uint8Array(event);
    }
  }

  finalSubmit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.fourthInputGroup);

    const dateObj = new Date();

    let postData = {
      post_id: '',
      user_id: this.userid,
      imageList_id: '',
      biddingSection_id: '',

      statusInfo: 'processing',
      geoAddress: this.thirdFormGroup.value['sellingAddressControl'],
      carData: {
        makeYear: this.firstFormGroup.value,
        basicInfo: this.secondFormGroup.value,
        detailInfo: this.thirdFormGroup.value,
        sellerNote: this.fifthInputGroup
      },

      periodAndTime: {
        createdUTC: dateObj,
        createdLocal: dateObj.toLocaleString()
      },

      updateHistory: [],
      priceHistory: [this.thirdFormGroup.value['carPriceControl']],
      currentPrice: this.thirdFormGroup.value['carPriceControl']
    }

    this.postService.create(postData, this.fourthInputGroup, this.historyReportFileUint);

  }


  iterateAll(formGroup: FormGroup, level: number) {
    // base case
    if (!formGroup.controls) {
      return;
    } else {
      for (const control in formGroup.controls) {
        console.log(' '.repeat(level) + level + ' ' + control);
        if (formGroup.get(control).value) {
          this.iterateAll(formGroup.get(control) as FormGroup, level + 1);
        }
      }
    }
  }

}



