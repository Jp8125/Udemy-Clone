import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Mediaresource } from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Media} from 'src/app/Interfaces/topic';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(value=>{
      this.mediaobj={} as Media
      this.CourseStore.select(Mediaresource(value['course'])).subscribe(res=>{
        this.mediaobj=res.find(obj=>(obj.topicId==value['Tid']&&obj.mediaType=="Video")) as Media
        
      })
    })
  }
  mediaobj!:Media
  constructor(private activatedRoute:ActivatedRoute,private CourseStore:Store<CourseState>){
    }
}
