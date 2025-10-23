import { Pipe, PipeTransform } from '@angular/core';
import { Courses } from 'src/app/Interfaces/course';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( courses: Courses[],keyword: string): Array<Courses> {
    return courses.filter(obj=>obj.name.toLowerCase().includes(keyword));
  }

}
