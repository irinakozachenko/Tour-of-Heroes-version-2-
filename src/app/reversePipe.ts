import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'reverse',
  pure: false,
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = '';
    for (let i = value.length - 1; i >= 0; i--) {
      reverse += value[i];
    }
    return reverse;
  }
  
}