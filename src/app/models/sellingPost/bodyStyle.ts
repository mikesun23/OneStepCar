export class BodyStyle {
  bodyStyle: string[] = ['Convertible', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Van', 'Hatchback'];
  // bmwBodyStyle: string[] = ['Convertible', 'Gran', 'Turismo', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Hatchback(i3)'];
  // porscheBodyStyle: string[] = ['Convertible', 'Coupe', 'Sedan', 'SUV', 'Wagon(panamera)'];
  // audiBodyStyle: string[] = ['Convertible', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Hatchback(A3-etron, A3)'];
  // mercedesBenzBodyStyle: string[] = ['Convertible', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Van(Sprinter, Metris)', 'Hatchback(B-class)'];

  constructor() { }

  getDefault() {
    return this.bodyStyle;
  }

  get bmwBodyStyle(): string[] {
    return ['Convertible', 'Gran', 'Turismo', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Hatchback(i3)'];
  }

  get porscheBodyStyle(): string[] {
    return ['Convertible', 'Coupe', 'Sedan', 'SUV', 'Wagon(panamera)'];
  }

  get audiBodyStyle(): string[] {
    return ['Convertible', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Hatchback(A3-etron, A3)'];
  }

  get mercedesBenBodyStyle(): string[] {
    return ['Convertible', 'Coupe', 'Sedan', 'Wagon', 'SUV', 'Van(Sprinter, Metris)', 'Hatchback(B-class)'];
  }
}