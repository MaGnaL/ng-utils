import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negate'
})
export class NegatePipe implements PipeTransform {
  public transform(value: any): any {
    return !value;
  }
}
