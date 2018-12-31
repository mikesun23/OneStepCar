import { BuildingBlockBaseObject } from './BuildingBlockBaseObject';

export class BuildingBlockDropdown extends BuildingBlockBaseObject<string> {

  controlType = 'dropdown';
  options: { key: string, value: string }[] = [];

  constructor(initValues: {} = {}) {
    super(initValues);
    this.options = initValues['options'] || [];
  }

  populateNumberOptions(start: number, end: number, incremental: number) {
    while (start <= end) {
      this.options.push({ key: start.toString(), value: start.toString() })
      start += incremental;
    }
  }

  populateStringOptions(options: string[]) {
    for (let i in options) {
      this.options.push({ key: i, value: i.charAt(0).toUpperCase() });
    }
  }




}