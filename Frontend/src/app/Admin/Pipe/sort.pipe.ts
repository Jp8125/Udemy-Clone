import { Pipe, PipeTransform } from '@angular/core';
import { Courses } from 'src/app/Interfaces/course';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(courses: Courses[],sorter: number): Array<Courses> {
    if(sorter==1){
      return courses.sort((a,b)=>{
        if(a.name<b.name){
          return -1
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0
      })
    }
    if(sorter==2){
      return courses.sort((a,b)=>a.price-b.price)
    }
    else{
      return courses.sort((a,b)=>new Date(a.createdDate).getTime()-new Date(b.createdDate).getTime())
    }
   
  }

}
