import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numInt'
})
export class NumIntPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== '--') {
      if (args.toString().length === 6) {
        return parseInt((value / 100).toFixed(0), 0);
      } else {
        return value;
      }

    } else {
      return value;
    }
  }

}
