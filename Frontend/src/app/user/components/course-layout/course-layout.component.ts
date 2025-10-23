import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  getSingleCourse } from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Courses } from 'src/app/Interfaces/course';
import { UserStateService } from '../../Services/user.state.service';
import { ProgressState } from 'src/app/Interfaces/progress-state';
import { loadProgress } from 'src/app/ProgressStore/progress.action';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.css']
})
export class CourseLayoutComponent {
courseToview!:Courses
constructor(private routes:ActivatedRoute,private CourseStore:Store<CourseState>,private router:Router,private user:UserStateService,private userProgress:Store<ProgressState>){
let id:number=this.user.id;

this.routes.params.subscribe(res=>{
  this.CourseStore.select(getSingleCourse(res['name'])).subscribe(obj=>{
    this.courseToview=obj as Courses
    this.userProgress.dispatch(loadProgress({uid:id,cid:this.courseToview.courseId}))
  }) 
})
}

}
