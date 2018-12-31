import { BuildingBlockBaseObject } from './BuildingBlockBaseObject';

export class BuildingBlockFormObject extends BuildingBlockBaseObject<string> {
    
    controlGroup: {} = {};

    constructor(initValues: {} = {}) {
        super(initValues);

        this.controlGroup = initValues['controlGroup'] || {};

    }
}