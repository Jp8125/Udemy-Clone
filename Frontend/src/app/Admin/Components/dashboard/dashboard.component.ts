import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getNumbers } from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { AdminService } from '../../Services/admin.service';
import { UserStateModel } from 'src/app/Interfaces/user-state.model';
import { UserCount } from 'src/app/Userstore/user.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  Courses:Observable<number>=of(0)
  totalEarnings:number=0
  totalUsers:Observable<number>=of(0)
constructor(private courseStore:Store<CourseState>,private adminserv:AdminService,private userstore:Store<UserStateModel>){
this.Courses=this.courseStore.select(getNumbers)
this.adminserv.GetPayments().subscribe({next:(res)=>{
  this.totalEarnings=0
  res.forEach(obj=>{
    this.totalEarnings=this.totalEarnings+obj.paymentAmount
  })  
}})
this.totalUsers=this.userstore.select(UserCount)
}

}
