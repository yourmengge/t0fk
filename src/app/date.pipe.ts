import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== '') {
      return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2);
    } else {
      return '-';
    }
  }

}
