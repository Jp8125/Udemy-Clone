import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { TopicDetaild, TopicInput, subTopic } from '../../../Interfaces/topic';
import { CourseStoreService } from '../../Services/course-store.service';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { EditCourseSuccess } from 'src/app/CourseStore/course.actions';
import { Courses } from 'src/app/Interfaces/course';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';

@Component({
  selector: 'app-add-subtopic',
  templateUrl: './add-subtopic.component.html',
  styleUrls: ['./add-subtopic.component.css']
})
export class AddSubtopicComponent {
  CourseArray!: Array<Courses>
  subtopicForm!: FormGroup
  Topics!: Array<TopicDetaild>
  FilterTopics!: Array<TopicDetaild>
  SubTopics!: Array<subTopic>
  filterSubTopics!: Array<subTopic>
  constructor(private fb: FormBuilder, private adminService: AdminService,private Course:Store<CourseState>) {
    this.subtopicForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      course: ['', Validators.required],
      topics: ['', Validators.required],
      parentId: ['', Validators.required]
    });
    this.adminService.GetTopics().subscribe({
      next: (res) => {
        this.Topics = res
      }, error: (err) => {
        console.log(err);
      }
    })
    this.adminService.GetSubtopics().subscribe({
      next: (res) => {
        this.SubTopics = res
      }, error: (err) => {
        console.log(err);
      }
    })
    this.Course.select(selectallCourse).subscribe(res=>{
      this.CourseArray=res
    })
  }
  get Id() {
    return this.subtopicForm.get('topics')?.value
  }
  get CourseId() {
    return this.subtopicForm.get('course')?.value
  }
  Filter(id: number) {
    this.filterSubTopics = this.SubTopics.filter(obj => obj.topics == id)
  }
  Filtertopics(Id: number) {
    this.FilterTopics = this.Topics.filter(obj => obj.courseId == Id)
  }
  Add() {
    if (this.subtopicForm.invalid) {
      alert("fill form")
    }
    else {
      let SubTopcs: TopicInput
      if (this.subtopicForm.get('parentId')?.value == "null") {
        SubTopcs = { title: this.subtopicForm.get('title')?.value, description: this.subtopicForm.get('description')?.value, topics: this.subtopicForm.get('topics')?.value, parentId: null,courseId:this.CourseId }
      }
      else {
        SubTopcs = this.subtopicForm.value
      }
      this.adminService.AddSubtopic(SubTopcs).subscribe({
        next: (res) => {
          alert(res.message)
          console.log(res.data);
          this.Course.dispatch(EditCourseSuccess({data:res.data,id:res.data.courseId}))
        }, error: (err) => {
          console.log(err);
        }
      })
      this.subtopicForm.reset()
    }
  }
}
