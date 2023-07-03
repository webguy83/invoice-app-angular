import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/utils/interfaces';

@Pipe({
  name: 'convertItems',
})
export class ConvertItemsPipe implements PipeTransform {
  transform(items: Item[]): number[] {
    return items.map((item) => item.price * item.quantity);
  }
}
