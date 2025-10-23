import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSingleCourse } from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Courses } from 'src/app/Interfaces/course';
import { SubTopic, TopicDetaild, subTopic } from 'src/app/Interfaces/topic';
import { AdminService } from '../../Services/admin.service';
import { Observable } from 'rxjs';
import { EditSubtopic } from 'src/app/CourseStore/course.actions';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent {
  coursedata!:Courses
  subtopicForm:FormGroup
  topics!:Array<TopicDetaild>
  updateId!:number
constructor(private course:Store<CourseState>,private activeroute:ActivatedRoute,private fb:FormBuilder,private admin:AdminService) {
  this.activeroute.params.subscribe(res=>{
    let name:string=res['course']
    this.course.select(getSingleCourse(name)).subscribe(res=>{
      this.coursedata=res as Courses
    })
  })
  // this.topics=this.admin.GetTopics()
  this.admin.GetTopics().subscribe(res=>{
    this.topics=res.filter(obj=>obj.courseId==this.coursedata.courseId)
  })
  
  this.subtopicForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    topics: ['', Validators.required],
    parentId: [null, Validators.required]
  });
}
edit(value:SubTopic,tid:number){
  let data:subTopic={...value,topics:tid,parentId:null}
  this.subtopicForm.patchValue(data)
  this.updateId=value.subTopicId
}
update(){
  this.course.dispatch(EditSubtopic({data:this.subtopicForm.value,id:this.updateId,courseId:this.coursedata.courseId}))
}
}
