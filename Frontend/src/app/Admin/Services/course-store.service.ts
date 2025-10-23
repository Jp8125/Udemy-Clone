import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {  Courses } from '../../Interfaces/course';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class CourseStoreService {
  CourseStore!:BehaviorSubject<Array<Courses>>
  constructor(private admin:AdminService) {
    const init:Array<Courses>=[];
    this.CourseStore = new BehaviorSubject(init)
    this.SetCourses()
   }
   SetCourses(){
    this.admin.GetCources().subscribe({
      next:(res)=>{
        this.CourseStore.next(res)
      },error:(err)=>{
        console.log(err.message);
      }
    })
   }
   GetCources(){
    return this.CourseStore.asObservable();
   }
   GetlimtFields(){
    return this.GetCources().pipe(map(res=>res.map(obj=>{return {Id:obj.courseId,name:obj.name}})))
   }
}
