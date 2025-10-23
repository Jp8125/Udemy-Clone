import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getId, getTopics } from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { ProgressInputModel } from 'src/app/Interfaces/progress-input.model';
import { ProgressState } from 'src/app/Interfaces/progress-state';
import { ProgressModel } from 'src/app/Interfaces/progress.model';
import { Topic } from 'src/app/Interfaces/topic';
import { selectProgress } from 'src/app/ProgressStore/progress.selector';
import { UserStateService } from '../../Services/user.state.service';
import { UpdateProgress } from 'src/app/ProgressStore/progress.action';
import { CourseService } from '../../Services/course.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent {
  topic!:Topic
  count:number=0
  progressArray:Array<ProgressModel>=[]
  courseId:number=0
  showBtn:boolean=false
  constructor(private activatedRoute:ActivatedRoute,private CourseStore:Store<CourseState>,private user:UserStateService,private progress:Store<ProgressState>,private cs:CourseService){
  this.activatedRoute.queryParams.subscribe(res=>{
    this.CourseStore.select(getTopics(res['course'],res['topic'])).subscribe(res=>{
      this.topic=res as Topic
      this.progress.select(selectProgress).subscribe(res=>{
        console.log(res);
        this.progressArray=res
        this.showBtn=this.validateProgress()
      })
    })
    this.CourseStore.select(getId(res['course'])).subscribe(res=>{
      this.courseId=res as number
    })
  })

  }
  validateProgress(){
    console.log(this.progressArray.find(obj=>obj?.topics==this.topic.topicId));
    return this.progressArray.find(obj=>obj?.topics==this.topic.topicId)==undefined?false:true;
  }
  UpdateProgress(){
    let userProgress:ProgressInputModel={
      uid:this.user.id,
      courseId:this.courseId,
      topicId:this.topic.topicId
    }
    this.progress.dispatch(UpdateProgress({data:userProgress}))
  }
}
