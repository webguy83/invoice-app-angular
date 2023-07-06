import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortchars',
})
export class SortcharsPipe implements PipeTransform {
  transform(value: string): string {
    const chars = value.split('');
    const letters = chars.filter((char) => {
      return (
        (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) ||
        (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)
      );
    });
    const numbers = chars.filter((char) => {
      return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
    });

    numbers.forEach((_, i) => {
      if (i < 2) {
        numbers.push('0');
      }
    });

    const output = [...numbers.slice(0, 2), ...letters.slice(0, 4)]
      .join('')
      .toUpperCase();

    return output;
  }
}
