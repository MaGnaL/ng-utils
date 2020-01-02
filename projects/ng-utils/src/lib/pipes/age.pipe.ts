import {Pipe, PipeTransform} from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  public transform(date: string): number {
    // validate date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('Date format is invalid. Need to use YYYY-MM-DD!');
    }

    return moment().diff(moment(date, 'YYYY-MM-DD'), 'years');
  }
}
