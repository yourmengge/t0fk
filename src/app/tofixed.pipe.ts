import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class TofixedPipe implements PipeTransform {

  transform(value: any, args?: String): any {
    if (value !== '--' && value !== '' && value !== '-') {
      if (args.length === 6) {
        return (Math.round(parseFloat(value) * 100) / 100).toFixed(2);
      } else {
        return (Math.round(parseFloat(value) * 10000) / 10000).toFixed(4);
      }
    } else {
      return value;
    }
  }

}
