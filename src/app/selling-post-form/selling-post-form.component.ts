import { BuildingBlockFormObject } from './../models/reusable/BuildingBlockFormObject';
import { CarObjectAssemble } from './../models/reusable/CarObjectAssemble';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-selling-post-form',
  templateUrl: './selling-post-form.component.html',
  styleUrls: ['./selling-post-form.component.css']
})
export class SellingPostFormComponent implements OnInit {

  carObject: BuildingBlockFormObject[] = [];
  carForm: FormGroup = new FormGroup({});

  constructor(private assemble: CarObjectAssemble, private fb: FormBuilder) {
    this.carObject = this.assemble.getObject();
    this.carForm = this.assemble.getForm();
  }

  ngOnInit() {
    // console.log("carForm: ", this.assemble.getForm());
    // console.log(this.carForm.get('packageInformation').get('0').get('name'))
    // Object.keys(this.carObject[0].controlGroup).forEach(k => {
    //   console.log(k);
    // })

    for ( let e in this.carObject[0].controlGroup) {
      console.log(e);
    }
  }

  controlGroupComparator(a, b) {
    return 0;
  }

  get packages() {
    return this.carForm.get('packageInformation') as FormArray;
  }
  
  addPackage() {
    this.packages.push(this.fb.group(
      {
        name: [''],
        price: [''],
        features: this.fb.array([
          this.fb.control('')
        ])
      }
    ));
  }

  getFeature(i: number): FormArray {
    return this.packages.get(i.toString()).get('features') as FormArray;
  }

  addFeature(i: number) {
    this.getFeature(i).push(this.fb.control(''));
  }

  onSubmit() {
    console.log('submit is called');
    console.log(this.carForm.value);
  }

}
