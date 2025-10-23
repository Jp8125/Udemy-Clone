import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectallCarts, cartNumbers } from 'src/app/CartStore/carts.selectors';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { Cartmodel } from 'src/app/Interfaces/Cart.model';
import { CartStore } from 'src/app/Interfaces/CartStore.model';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Courses } from 'src/app/Interfaces/course';
import { Payment, PaymentInput } from 'src/app/Interfaces/payment.model';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStateService } from '../../Services/user.state.service';
import { UserModel } from 'src/app/Interfaces/user.model';
import { clearCart } from 'src/app/CartStore/carts.actions';
import { Router } from '@angular/router';
import { PurchaseStore } from 'src/app/Interfaces/purchasestore.model';
import { puchaseCourse } from 'src/app/PurchaseStore/purchase.actions';
declare var Razorpay: any;
@Component({
  selector: 'app-completecheckout',
  templateUrl: './completecheckout.component.html',
  styleUrls: ['./completecheckout.component.css']
})
export class CompletecheckoutComponent {
  courses: Array<Courses> = []
  cart: Array<Cartmodel> = []
  coursestobuy: Array<Courses> = []
  total: number = 0;
  oid!: string
  userData!: UserModel
  constructor(private courseState: Store<CourseState>, private cartStore: Store<CartStore>, private auth: AuthService, private user: UserStateService,private router:Router,private purchaseStore:Store<PurchaseStore>) {
    this.courseState.select(selectallCourse).subscribe(res => {
      this.courses = res
    })
    this.cartStore.select(selectallCarts).subscribe(res => {
      this.coursestobuy = []
      this.cart = res
      this.cart.forEach(item => {
        this.coursestobuy.push(this.courses.find(obj => obj.courseId == item.courseId) as Courses)
      })
    })
    this.coursestobuy.forEach(obj => {
      this.total = this.total + obj.price
    })
    this.user.User.subscribe(res => {
      this.userData = res
    })
  }
  pay() {
    if(this.total==0){
      this.total=2
    }
    this.auth.createOrder(this.total, 'INR', 'demo').subscribe({
      next: (value) => {
        this.oid = value.orderId
        console.log(this.oid);
        this.makePayment()
      },
      error(err) {
        console.log(err);
      },
    })
  }
  makePayment(): void {
    const options: any = {
      key: 'rzp_test_3yldLqNiLmkx0c',
      amount: this.total*100, 
      name: 'Udemy',
      description: 'Test payment',
      currency: 'INR',
      order_id: this.oid,
      handler: (response: any) => {
        // This function will handle the success response
        console.log(response);
        this.auth.getPayment(response['razorpay_payment_id']).subscribe({
          next: (resp) => {
            let data: Payment = JSON.parse(resp.res)
            console.log(new Date(data.created_at).toISOString());
            console.log(data);
            let inputdata: PaymentInput = {
              purchaseId: data.id,
              paymentAmount: (data.amount / 100),
              paymentMode: data.method,
              paymentStatus: data.status,
              uid:this.userData.id
            }
            this.auth.addPayment(inputdata).subscribe({
              next:async(value) => {
                console.log(value.message);
                let courseTobuy:Array<{ userId:number,courseId:number}>=[]
                this.cart.forEach(obj=>{
                  courseTobuy.push({userId:obj.userId,courseId:obj.courseId})
                })
               await this.purchaseStore.dispatch(puchaseCourse({data:courseTobuy,uid:this.userData.id}))
               await this.cartStore.dispatch(clearCart({uid:this.userData.id}))
               await this.router.navigate(['/mylearnings'])
              },
              error(err) {
                console.log(err.error);

              },
            })
          }, error(err) {
            console.log(err.error);

          },
        })
      },
      prefill: {
        name: this.userData.name,
        email: this.userData.email,
        contact: this.userData.phonNo
      },
      theme: {
        color: '#A435F0'
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }
}