import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Courses } from 'src/app/Interfaces/course';
import { PurchaseStore } from 'src/app/Interfaces/purchasestore.model';
import { allpurchasedCourses } from 'src/app/PurchaseStore/purchase.selectors';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.css']
})
export class MyLearningComponent {
  purchasedCourses:Array<Courses>=[]
constructor(private purchaseState:Store<PurchaseStore>,private courseState:Store<CourseState>) {
  this.purchaseState.select(allpurchasedCourses).subscribe((purchased)=>{
    this.purchasedCourses=[]
    this.courseState.select(selectallCourse).subscribe(res=>{
      purchased.forEach(element => {
        this.purchasedCourses.push(res.find(obj=>obj.courseId==element.courseId) as Courses)
    });
    this.purchasedCourses=this.purchasedCourses.filter(obj=>obj!=undefined)
    })
  })
}
}
