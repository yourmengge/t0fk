import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== null) {
      return value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.substr(4, 2);
    } else {
      return '-';
    }
  }

}
