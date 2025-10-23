import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTocart } from 'src/app/CartStore/carts.actions';
import { selectallCarts } from 'src/app/CartStore/carts.selectors';
import { getSingleCourse } from 'src/app/CourseStore/course.selectors';
import { CartInputmodel, Cartmodel } from 'src/app/Interfaces/Cart.model';
import { CartStore } from 'src/app/Interfaces/CartStore.model';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Courses } from 'src/app/Interfaces/course';
import { PurchaseStore } from 'src/app/Interfaces/purchasestore.model';
import { allpurchasedCourses } from 'src/app/PurchaseStore/purchase.selectors';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStateService } from 'src/app/user/Services/user.state.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent {
  course!: Courses
  cartItems: Array<Cartmodel> = []
  showcart: boolean = true
  showMylearnig:boolean=false
  purchasedCourse:Array<{courseId: number,createdDate:string}>=[]
  constructor(private purchaseItems:Store<PurchaseStore>,private activatedRoute: ActivatedRoute, private store: Store<CourseState>, private auth: AuthService, private router: Router, private cartStore: Store<CartStore>, private user: UserStateService) 
  {
    this.activatedRoute.params.subscribe(obj => {
      let name: string = obj['name'] || obj['coursename']
      this.store.select(getSingleCourse(name)).subscribe({
        next: (res) => {
          this.course = res as Courses
        }
      })
    })
    if (this.auth.Islogin()) {
      this.cartStore.select(selectallCarts).subscribe(res => {
        console.log(res);
        this.cartItems = res;
      })
      this.purchaseItems.select(allpurchasedCourses).subscribe(res=>{
        this.purchasedCourse=res
      })
      let exist = this.cartItems.find(obj => obj.courseId == this.course.courseId)
      if (exist != null) {
        this.showcart = false
      }
      else {
       
        let find=this.purchasedCourse.find(check=>check.courseId==this.course.courseId)
        if(find != null){
          this.showcart = false
          this.showMylearnig=true
        }
        else
        {
          this.showcart = true
        }
      }
    }
  }

  addTocart() {
    if (this.auth.Islogin()) {
      console.log("valid user");
      let value: CartInputmodel = { userId: this.user.id, courseId: this.course.courseId }
      console.log(value);
      this.cartStore.dispatch(addTocart({ data: value }))
      this.router.navigate(['/cart'])
    }
    else {
      this.router.navigate(['/login'])
      console.log("not a valid user")
    }
  }
  goTocart() {
    this.router.navigate(['/cart'])
  }
}
