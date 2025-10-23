import { Component, Input } from '@angular/core';
import { Courses } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-dynamic-carousel',
  templateUrl: './dynamic-carousel.component.html',
  styleUrls: ['./dynamic-carousel.component.css']
})
export class DynamicCarouselComponent {
@Input() name!:string
@Input() courses!:Array<Courses>
@Input() routename!:string
ArrayGroup<Type>(arg: Array<Type>,n:number) {
  let CourseGroup:Array<Array<Type>>=[]
   for (let i = 0; i < arg.length/n; i++) {
    CourseGroup.push(arg.slice(i*n,(i+1)*n))
    }
   return CourseGroup;
 }
}
