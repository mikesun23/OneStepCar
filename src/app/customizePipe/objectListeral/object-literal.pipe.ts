import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectLiteral'
})


export class ObjectLiteralPipe implements PipeTransform {

  transform(value: { any }[]): any {

    let y = value.map(a => {
      const name = Object.keys(a)[0];
      const mrsp = a[name]['MRSP'];
      const invoice = a[name]['invoice'];
      const features = a[name]['features'];
      return { name: name, mrsp: mrsp, invoice: invoice, features: features };
    })

    return y;
  }

}
