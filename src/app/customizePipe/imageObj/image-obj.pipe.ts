import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageObj '
})
export class ImageObjPipe implements PipeTransform {

  transform(value: any): any {
    return Object.keys(value)[0];
  }

}
