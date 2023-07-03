import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addnums',
})
export class AddnumsPipe implements PipeTransform {
  transform(numbers: number[]): number {
    return numbers.reduce((prevVal, curVal) => {
      return prevVal + curVal;
    }, 0);
  }
}
