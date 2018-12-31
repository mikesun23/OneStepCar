import { CarMakesDataService } from './../../services/carMakesDataService/car-makes-data.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarMakes } from 'src/app/models/sellingPost/carMakes';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {
  @Output() submitFilter = new EventEmitter<{}[]>();
  step = 0;

  // filter box cateria data
  /**
   * part 1:
   *  makes yearRange model trim
   * 
   * part 2: 
   *  price range, mileage range
   * 
   * part 3:
   *  vehicle history report, transmission, drivetrain, cylinder number,body style,  ex color, in color
   */

  modelYearTrimFullMap: {} = {};
  carMakes: {} = new CarMakes().getMakes();
  yearRange: {};
  modelList: string[] = [];
  trimList: string[] = [];

  carModel: string;
  carTrim: string;

  // selected criteria
  selectedMake: {} = {};

  selectedYears: number[] = [];
  selectedYearStart: number;
  selectedYearEnd: number;

  totalSelectedModelCounts: number = 5;
  selectedModels: string[] = [];

  selectedTrims: string[] = [];

  // filter box formControls
  filterForm: FormGroup = this.fb.group({
    make: ['', Validators.required],
    yearArray: this.fb.array(['']),
    model: [''],
    trim: [''],
    priceRange: this.fb.group({
      startPrice: [''],
      endPrice: ['']
    }),
    mileageRange: this.fb.group({
      startMile: [''],
      endMile: ['']
    }),
    transmission: [''],
    drivetrain: [''],
    cylinder: [''],
    bodystyle: [''],
    exColor: [''],
    inColor: ['']
  })

  constructor(private fb: FormBuilder, private carMakesDataService: CarMakesDataService) { }

  ngOnInit() {

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  controlGroupComparator(a, b) {
    return 0;
  }

  makeSelected() {
    this.selectedMake = this.carMakes[this.filterForm.controls['make'].value];
    this.carMakesDataService.getFullTree(this.selectedMake['brand']).subscribe(res => {
      this.modelYearTrimFullMap = res;
      this.modelList = Object.keys(res);
      console.log(res);
    })
  }

  yearMultiSelected(checked, year) {
    if (checked) {
      let index = this.selectedYears.indexOf(year);
      if (index == -1) {
        this.selectedYears.push(year);

        // trimList should be changed
        this.updateTrimList();
      }
    } else {
      let index = this.selectedYears.indexOf(year);
      if (index > -1) {
        this.selectedYears.splice(index, 1);

        // trimList should be changed
        this.updateTrimList();
      }
    }
    console.log(this.selectedYears);
  }

  yearRangeStartSelected(start) {
    this.selectedYearStart = start;
    this.generateYearArray();
  }

  yearRangeEndSelected(end) {
    this.selectedYearEnd = end;
    this.generateYearArray();
  }

  generateYearArray() {
    if (this.selectedYearStart && this.selectedYearEnd && this.selectedYearStart <= this.selectedYearEnd) {
      for (let i = this.selectedYearStart; i <= this.selectedYearEnd; i++) {
        let index = this.selectedYears.indexOf(i);
        if (index == -1) {
          this.selectedYears.push(i);

          // trimList should be changed
          this.updateTrimList();
        }
      }
    }
  }

  modelMultiSelected(checked, model) {
    if (checked && this.totalSelectedModelCounts > 0) {
      let index = this.selectedModels.indexOf(model);
      if (index == -1) {
        this.selectedModels.push(model);
        this.totalSelectedModelCounts--;

        // trimList should be changed
        this.updateTrimList();
      }
    } else {
      let index = this.selectedModels.indexOf(model);
      if (index > -1) {
        this.selectedModels.splice(index, 1);
        if (this.totalSelectedModelCounts < 5) {
          this.totalSelectedModelCounts++;
        }

        //trimList should be changed
        this.updateTrimList();
      }
    }
  }

  updateTrimList() {
    // start from model/series, then year, get the trimList
    this.trimList = [];

    this.modelYearTrimFullMap;

    // for all selected_models
    this.selectedModels.forEach(model => {

      // find selected_model in the full_map
      if (this.modelYearTrimFullMap[model] != undefined) {
        Object.keys(this.modelYearTrimFullMap[model]).forEach(year => {
          if (this.selectedYears.includes(parseInt(year))) {
            // if the current model/series contains the year that in selectedYear array
            // get all the trims under this year, throw in trimList
            for (let trim of this.modelYearTrimFullMap[model][parseInt(year)]) {
              if (!this.trimList.includes(trim)) {
                this.trimList.push(trim);
              }
            }
          }
        })
      }

    })
    console.log(this.trimList);
  }

  trimMultiSelected(checked, trim) {
    let index = this.selectedTrims.indexOf(trim);
    if (checked) {
      if (index == -1) {
        this.selectedTrims.push(trim);
      }
    } else {
      if (index > -1) {
        this.selectedTrims.splice(index, 1);
      }
    }
    console.log(this.selectedTrims);
  }

  applyFilter() {
    // emit filter_date to listing_page for updating listing
    // this.submitFilter.emit();

    console.log('make: ' + this.selectedMake['brand'] + ' year: ' + this.selectedYears +
      ' models: ' + this.selectedModels + ' trim: ' + this.selectedTrims);

    
      const make =this.selectedMake['brand'].toLowerCase() as string;
      const year =this.selectedYears;
      const model = this.selectedModels;
      const trim =this.selectedTrims;

      let validSearchPaths: {}[] = [];

      // get all valid four-factor combinations from the fullMapTree
      for (let m of model) {
        const existModel = this.modelYearTrimFullMap[m];
        console.log(existModel);
        if (existModel) {
          for (let y of year) {
            const existYear = existModel[y];
            console.log(existYear);
            if (existYear) {
              for (let t of trim) {
                
                if (existYear.includes(t)) {
                  validSearchPaths.push({
                    carMake: make,
                    carYear: y,
                    carModel: m,
                    carTrim: t
                  })
                  console.log(validSearchPaths);
                }
              }
            }
          }
        }
      }
    // should submit all above valid paths to post-listing page for filtering
    this.submitFilter.emit(validSearchPaths);
  }
}