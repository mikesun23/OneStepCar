import { BuildingBlockBaseObject } from './BuildingBlockBaseObject';

export class BuildingBlockInputNumber extends BuildingBlockBaseObject<string> {

  controlType = 'numberbox';
  type: number;

  constructor(initValues: {} = {}) {
    super(initValues);
    this.type = initValues['type'] || '';
  }


}