import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSorting'
})
export class UserSortingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
