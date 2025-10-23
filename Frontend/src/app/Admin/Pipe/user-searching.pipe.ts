import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from 'src/app/Interfaces/user.model';

@Pipe({
  name: 'userSearching'
})
export class UserSearchingPipe implements PipeTransform {
  transform(value: Array<UserModel>,args: string): Array<UserModel> {
    return value.filter(obj=>(obj.name.toLowerCase().includes(args)||obj.email.includes(args)||obj.phonNo.includes(args)));
  }
}
