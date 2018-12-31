import { Injectable } from '@angular/core';
import { BuildingBlockFormObject } from './BuildingBlockFormObject';
import { ObjectToFormGroupService } from '../../services/modelConvertor/objectToFormGroup/object-to-form-group.service';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CarObjectAssemble {

  private stepperCarObject: BuildingBlockFormObject[] = [

    // firstFormGroup: make and year
    new BuildingBlockFormObject({
      // here are metadata about section
      key: 'makeAndYear',
      lavel: 'Choose make and year',
      controlType: '',
      controlGroup: {
        make: {displayKey: 'Make', controlType: 'formControl'},
        year: {displayKey: 'Year', controlType: 'formControl'},
      }
    }),

    new BuildingBlockFormObject({
      key: 'basicInformation',
      label: 'Basic Information',
      controlType: 'listOfGroup',
      controlGroup: {
        model: {displayKey: 'Model', controlType: 'formControl'},
        trim: {displayKey: 'Trim', controlType: 'formControl'},
        bodyStyle: {displayKey: 'Body Style', controlType: 'formControl'},
        packages: {displayKey: 'Equipped Packages', controlType: 'formGroup'}
      },

    }),

    new BuildingBlockFormObject({
      key: 'detailInformation',
      label: 'Detail Information',
      controlType: 'listOfEntry',
      controlGroup: {
        exColor: {displayKey: 'Exterior Color', controlType: 'formControl'},
        inColor: {displayKey: 'Interior Color', controlType: 'formControl'},
        transmission: {displayKey: 'Transmission', controlType: 'formControl'},
        drivetrain: {displayKey: 'Drivetrain', controlType: 'formControl'},
        cylinder: {displayKey: 'Cylinder', controlType: 'formControl'},
        mileage: {displayKey: 'Mileage', controlType: 'formControl'},
        vin: {displayKey: 'VIN', controlType: 'formControl'},
        price: {displayKey: 'Price', controlType: 'formControl'}
      }
    })


  ];

  private carObject: BuildingBlockFormObject[] = [
    new BuildingBlockFormObject({
      key: 'basicInformation',
      label: 'Basic Information', // this is section display name 
      controlType: 'listOfEntry', // control type of section, decide how to render each section
      controlGroup: {             // actual formGroup of controls
        'Year': 'control',
        'Make': 'control',
        'Model': 'control',
        'Body Style': 'control',
        'Trim': 'control',
        'Mileage': 'control',
        'Vin': 'control',
        'Price': 'control'
      }
    }),

    new BuildingBlockFormObject({
      key: 'detailInformation',
      label: 'Detail Information',
      controlType: 'listOfEntry',
      controlGroup: {
        'Exterior Color': 'control',
        'Interior Color': 'control',
        'Transmission': 'control',
        'Cylinders': 'control',
        'Driventrain': 'control',
        'Size': 'control',
        'DoorCount': 'control',
        'Fuel Type': 'control'
      }
    }),

    new BuildingBlockFormObject({
      key: 'featureInformation',
      label: 'Feature Information',
      controlType: 'listOfGroup',
      controlGroup: {
        'Safety Features': [],
        'Convineance Features': []
      }
    }),

    new BuildingBlockFormObject({
      key: 'packageInformation',
      label: 'Package Information',
      controlType: 'arrayOfObject',
      controlGroup: [{ name: 'control', price: 'control', features: [] }]

    }),

  ];

  private carForm: FormGroup = new FormGroup({});

  constructor(private otfg: ObjectToFormGroupService) {
    this.carForm = this.convertObject();
  }

  getObject() {
    return this.carObject;
  }

  getForm() {
    return this.carForm;
  }

  convertObject() {
    let group: any = {};
    for (let section of this.carObject) {
      group[section.key] = this.otfg.convertor(section);
    }
    return new FormGroup(group);
  }

  // recursively print out all the 
  // iterateAll(formGroup: FormGroup, level: number) {
  //   // base case
  //   if(!formGroup.controls) {
  //     return;
  //   } else {
  //     for( const control in formGroup.controls) {
  //       console.log(' '.repeat(level) + level + ' ' + control);
  //       if(formGroup.get(control).value) {
  //         this.iterateAll(formGroup.get(control) as FormGroup, level+1);
  //       }
  //     }
  //   }
  // }

}