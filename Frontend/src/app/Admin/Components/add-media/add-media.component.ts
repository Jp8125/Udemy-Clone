import { Component } from '@angular/core';
import { CourseStoreService } from '../../Services/course-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { TopicDetaild, subTopic } from 'src/app/Interfaces/topic';
import { UploadService } from 'src/app/Services/upload.service';
import { MediainputModel } from 'src/app/Interfaces/mediainput.model';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent {
  myfile!: File;
  message:string=""
  Types: Array<string> = ["Video", "File"]
  mediaForm!: FormGroup
  url!: string
  Topics!: Array<TopicDetaild>
  FilterTopics!: Array<TopicDetaild>
  SubTopics!: Array<subTopic>
  filterSubTopics!: Array<subTopic>
  CourseArray!: Array<{ Id: number, name: String }>
  constructor(private fb: FormBuilder, private adminService: AdminService, private courseStore: CourseStoreService, private upload: UploadService) {
    this.mediaForm = this.fb.group({
      mediaType: ['', Validators.required],
      mediaSrc: ['', Validators.required],
      course: ['', Validators.required],
      topics: ['', Validators.required],
      topicId: [0, Validators.required]
    });
    this.adminService.GetTopics().subscribe({
      next: (res) => {
        console.log(res);
        this.Topics = res
      }, error: (err) => {
        console.log(err);
      }
    })
    this.adminService.GetSubtopics().subscribe({
      next: (res) => {
        console.log(res);
        this.SubTopics = res
      }, error: (err) => {
        console.log(err);
      }
    })
    this.courseStore.GetlimtFields().subscribe({
      next: (value) => {
        this.CourseArray = value
      },
    })

  }
  get Id() {
    return this.mediaForm.get('topics')?.value
  }
  get CourseId() {
    return this.mediaForm.get('course')?.value
  }
  get Type() {
    return this.mediaForm.get('mediaType')?.value
  }
  get tId() {
    return this.mediaForm.get('topicId')?.value
  }
  Filter(id: number) {
    console.log(id);
    console.log(this.SubTopics.filter(obj => obj.topics == id));
    this.filterSubTopics = this.SubTopics.filter(obj => obj.topics == id)
  }
  Filtertopics(Id: number) {
    this.FilterTopics = this.Topics.filter(obj => obj.courseId == Id)
  }
  Add() {
    let mediaValue: MediainputModel = {
      mediaSrc: this.url,
      mediaType: this.Type,
      topicId: this.tId
    }
    console.log(mediaValue);
    this.adminService.Addmedia(mediaValue).subscribe({
      next: (value) => {
        alert(value.message)
        this.mediaForm.reset()
        this.url=""
      },
    })
  }
  GetFile(event: any) {
    this.message="The file is Being uploaded pls wait for few seconds."
   
    this.myfile = event.target.files[0];
    let formdata = new FormData();
    formdata.append('file', this.myfile)
    let name = this.CourseArray.find(obj => obj.Id == this.CourseId)?.name as string
    this.upload.GetVideoUrl(formdata, name).subscribe({
      next: (value) => {
        this.url = value.url
        alert(value.message)
      },
      error: (err) => {
        console.log(err);
      },
    })
    setTimeout(() => {
      this.message=""
    }, 4000);
  }
}
