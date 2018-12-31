export class BuildingBlockBaseObject<T> {
  // value for preinput example value
  value: T;

  // all the rendering config entries
  key: string;
  label: string;
  required: boolean;
  priority: number;
  controlType: string;

  constructor(initValues: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    priority?: number,
    controlType?: string
  } = {}) {

    this.value = initValues.value;
    this.key = initValues.key || '';
    this.label = initValues.label || '';
    this.required = !!initValues.required;
    this.priority = initValues.priority === undefined ? 1 : initValues.priority;
    this.controlType = initValues.controlType || '';
  }


}

