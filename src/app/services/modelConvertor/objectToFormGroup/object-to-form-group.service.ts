import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BuildingBlockFormObject } from '../../../models/reusable/BuildingBlockFormObject';

@Injectable({
  providedIn: 'root'
})
export class ObjectToFormGroupService {

  constructor() { }

  convertor(object: BuildingBlockFormObject) {

    if(Array.isArray(object.controlGroup)) {
      // TODO: use [0] NOT ideal. 
      return new FormArray([this.convertorHelper(object.controlGroup[0])]);
    } else if(typeof(object.controlGroup)) {
      return this.convertorHelper(object.controlGroup);
    }
  }

  convertorHelper(controls) {

    if (typeof(controls)==='string') {
      return new FormControl(controls, Validators.required);
    }

    if (Array.isArray(controls) && controls.length===0) {
      return new FormControl(controls, Validators.required);
    }
    
    let group: any = {};

    Object.keys(controls).forEach(key => {

      if (controls[key] === 'control') {
        group[key] = new FormControl('', Validators.required);
      } else if (Array.isArray(controls[key])) {
        group[key] = new FormArray([this.convertorHelper(controls[key])]);
      } else if (!Array.isArray(controls[key]) && typeof (controls[key] === 'object')) {
        group[key] = this.convertorHelper(controls[key]);
      }

    })

    return new FormGroup(group);
  }
}
