import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adddays',
})
export class AdddaysPipe implements PipeTransform {
  transform(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
