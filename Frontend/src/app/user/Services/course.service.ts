import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../../Interfaces/course';
import { Category } from 'src/app/Interfaces/category';
import { UserModel } from '../../Interfaces/user.model';
import { CartInputmodel, Cartmodel } from 'src/app/Interfaces/Cart.model';
import { PurchaseStore } from 'src/app/Interfaces/purchasestore.model';
import { environment } from 'src/environments/environment';
import { ProgressModel } from 'src/app/Interfaces/progress.model';
import { ProgressInputModel } from 'src/app/Interfaces/progress-input.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url:string=environment.apiUrl
  constructor(private http:HttpClient) { }
  GetCourses():Observable<Array<Courses>>{
   return this.http.get<Array<Courses>>(this.url+"/Courses")
  }
  GetCategories():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.url+"/Categories")
  }
  GetUserById(id:number):Observable<UserModel>{
    return this.http.get<UserModel>(this.url+`/User/id?id=${id}`)
  }
  GetAllCategories():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.url+"/Categories/allcategories")
  } 
  GetCarts(uid:number):Observable<Array<Cartmodel>>{
    return this.http.get<Array<Cartmodel>>(this.url+`/Cart/${uid}`)
  }
  AddtoCart(data:CartInputmodel):Observable<Cartmodel>{
    return this.http.post<Cartmodel>(this.url+"/Cart",data)
  }
 RemovefromCart(id:number):Observable<Cartmodel>{
    return this.http.delete<Cartmodel>(this.url+`/Cart/${id}`)
  }
  purchase(data:Array<{ userId:number,courseId:number}>,Uid:number){
    return this.http.post<PurchaseStore>(this.url+`/Purchase/buy/${Uid}`,data)
  }
  clearCart(uid:number){
    return this.http.delete<{id:number}>(this.url+`/Cart/remove/${uid}`)
  }
  getPurchaseitems(uid:number){
    return this.http.get<PurchaseStore>(this.url+'/Purchase/'+uid)
  }
  getProgressDetails(uid:number,cid:number){
    return this.http.get<Array<ProgressModel>>(this.url+`/Progress/userProgress?uid=${uid}&cid=${cid}`)
    
  }
  updateProgress(progressData:ProgressInputModel):Observable<ProgressModel>{
    return this.http.post<ProgressModel>(this.url+'/Progress',progressData)
  }
}
