import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseUpdate, Courses } from '../../Interfaces/course';
import { Category, CategoryDto } from '../../Interfaces/category';
import { Topic, TopicDetaild, TopicInput, subTopic } from '../../Interfaces/topic';
import { User } from '../../Interfaces/user';
import { environment } from 'src/environments/environment.development';
import { PaymentInput } from 'src/app/Interfaces/payment.model';
import { UserModel } from 'src/app/Interfaces/user.model';
import { MediainputModel } from 'src/app/Interfaces/mediainput.model';
import { EarningModel } from 'src/app/Interfaces/earning.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string=environment.apiUrl;
  constructor(private http:HttpClient) { }
  getUrl(mediaFile:FormData):Observable<{url:string,message:string}>{
    return this.http.post<{url:string,message:string}>(this.url+"/S3toUrl",mediaFile)
  }
  addCourse(Cources:Course){
    return this.http.post<Courses>(this.url+"/Courses",Cources)
  }
  GetCategories():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.url+"/Categories")
  }
  AddCategory(category:CategoryDto):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.url+"/Categories",category)
  }
  AddTopic(topic:Topic):Observable<{message:string,data:Courses}>{
    return this.http.post<{message:string,data:Courses}>(this.url+"/Topics",topic)
  }
  AddSubtopic(subtopic:TopicInput):Observable<{message:string,data:Courses}>{
    return this.http.post<{message:string,data:Courses}>(this.url+"/Subtopics",subtopic)
  }
  AddUser(user:User):Observable<UserModel>{
    return this.http.post<UserModel>(this.url+"/User",user)
  }
  GetAllCategories():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.url+"/Categories/allcategories")
  } 
  GetTopics():Observable<Array<TopicDetaild>>{
    return this.http.get<Array<TopicDetaild>>(this.url+"/Topics")
  }
  GetSubtopics():Observable<Array<subTopic>>{
    return this.http.get<Array<subTopic>>(this.url+"/Subtopics")
  }
  GetCources():Observable<Array<Courses>>{
    return this.http.get<Array<Courses>>(this.url+"/Courses")
  }
  GetPayments(){
    return this.http.get<Array<PaymentInput>>(this.url+'/Payment')
  }
  GetUsers(){
    return this.http.get<Array<UserModel>>(this.url+'/User')
  }
  Addmedia(value:MediainputModel){
    return this.http.post<{message:string}>(this.url+'/Media',value)
  }
  GetEarnings(){
    return this.http.get<Array<EarningModel>>(this.url+'/Purchase/Earnings')

  }
  deleteCourse(id:number){
    return this.http.put<{ id: number}>(this.url+`/Courses?Cid=${id}`,null)
  }
  updateCourse(id:number,data:CourseUpdate){
    return this.http.put<Courses>(this.url+`/Courses/update?cid=${id}`,data)
  }
  updateSubtopic(id:number,courseId:number,data:TopicInput){
    return this.http.put<Courses>(this.url+`/Subtopics/update/${id}?cid=${courseId}`,data)
  }
}
