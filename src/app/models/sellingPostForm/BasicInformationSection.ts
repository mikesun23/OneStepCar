import { BuildingBlockInputNumber } from '../reusable/BuildingBlockInputNumber';
import { BuildingBlockDropdown } from './../reusable/BuildingBlockDropdown';
import { BuildingBlockBaseObject } from './../reusable/BuildingBlockBaseObject';
export class BasicInformationSection {

  basicInformationSection: BuildingBlockBaseObject<any>[] = []

  year: BuildingBlockDropdown = new BuildingBlockDropdown({
    key: 'year',
    label: 'Year',
    required: 'true',
    order: 1
  });

  make: BuildingBlockDropdown = new BuildingBlockDropdown({
    key: 'make',
    label: 'Make',
    required: 'true',
    options: [
      {key: 'bmw', value: 'BMW'},
      {key: 'audi', value: 'Audi'},
      {key: 'mercedes-Benz', value: 'Mercedes-Benz'},
      {key: 'porsche', value: 'Porsche'},
    ],
    order: 2
  });


  constructor() {
    this.year.populateNumberOptions(2000, 2018, 1);
  }

  getModule() {
    this.basicInformationSection = [
      this.year,
      this.make
    ]
  }
}