import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../Interfaces/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  id:number=0
  private userState:BehaviorSubject<UserModel>
  constructor(private courseService:CourseService,private auth:AuthService) {
    let user:UserModel={} as UserModel
    this.userState=new BehaviorSubject(user);
    const helper = new JwtHelperService();
  if(this.auth.Islogin()){
    const decodedToken = helper.decodeToken(localStorage.getItem('token') as string);
    this.id=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"]||null
  }
  else
  {
    this.id=0
  }
    this.SetUserState(this.id)
   }
   SetUserState(id:number){
    this.courseService.GetUserById(id).subscribe({
      next:(res)=>{
        this.userState.next(res)
      },
      error:(err)=>{
        console.log(err); 
      }
    })
   }
   get User(){
    return this.userState.asObservable();
   }
}
