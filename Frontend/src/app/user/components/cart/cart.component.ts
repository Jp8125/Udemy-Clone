import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { removeFromcart } from 'src/app/CartStore/carts.actions';
import { cartNumbers, selectallCarts } from 'src/app/CartStore/carts.selectors';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { Cartmodel } from 'src/app/Interfaces/Cart.model';
import { CartStore } from 'src/app/Interfaces/CartStore.model';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Courses } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  courses:Array<Courses>=[]
  cart:Array<Cartmodel>=[]
  coursestobuy:Array<Courses>=[]
  numberofCourses:Observable<number>=of(0)
  total:number=0;
constructor(private courseState:Store<CourseState>,private cartStore:Store<CartStore>,private router:Router){
this.courseState.select(selectallCourse).subscribe(res=>{
  this.courses=res
})
this.cartStore.select(selectallCarts).subscribe(res=>{
  this.coursestobuy=[]
  this.cart=res
  this.cart.forEach(item=>{
    this.coursestobuy.push(this.courses.find(obj=>obj.courseId==item.courseId)as Courses)
  })
  this.calculateTotal()
})
this.numberofCourses=this.cartStore.select(cartNumbers)
}
remove(id:number){
  let cartId=this.cart.find(obj=>obj.courseId==id)?.cartId
  this.cartStore.dispatch(removeFromcart({id:cartId as number}))
}
navigate(){
  this.router.navigate(['./cart/checkout'])
}
calculateTotal(){
  this.total=0
  this.coursestobuy.forEach(obj=>{
    this.total=this.total+obj.price
  })
}
}
