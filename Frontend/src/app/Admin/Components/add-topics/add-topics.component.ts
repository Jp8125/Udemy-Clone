import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { CourseStoreService } from '../../Services/course-store.service';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { EditCourseSuccess } from 'src/app/CourseStore/course.actions';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { Courses } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-add-topics',
  templateUrl: './add-topics.component.html',
  styleUrls: ['./add-topics.component.css']
})
export class AddTopicsComponent {
topicForm!:FormGroup
CourseArray!:Array<Courses>
constructor(private fb:FormBuilder,private adminService:AdminService,private course:Store<CourseState>){
this.topicForm=this.fb.group({
    title: ['',[Validators.required]],
    description: ['',[Validators.required]],
    courseId:['',[Validators.required]]
})
this.course.select(selectallCourse).subscribe(res=>{
  this.CourseArray=res
})
}
Add(){
if(this.topicForm.invalid){
  alert("please fill the form")
}
else
{
  this.adminService.AddTopic(this.topicForm.value).subscribe({
    next:(res)=>{
      this.course.dispatch(EditCourseSuccess({data:res.data,id:res.data.courseId}))
      alert(res.message)
    },
    error(msg) {
      console.log('Error: ', msg);
    }
  })
  this.topicForm.reset()
}
}
}
