import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Register } from '../Interfaces/LoginModel';
import { Router } from '@angular/router';
import { Observable, flatMap } from 'rxjs';
import { UserUpdateModel } from '../Interfaces/user-update.model';
import { PaymentInput } from '../Interfaces/payment.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { EarningModel } from '../Interfaces/earning.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  canVerify: boolean = false
  errorMessage:string= ""
  url: string = environment.apiUrl
  constructor(private http: HttpClient, private router: Router) { }
  Login(loginData: Login): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url + '/Authenticate/login', loginData)
  }
  Signup(signupData: Register) {
    this.http.post<{ message: string }>(this.url + '/Authenticate/register', signupData).subscribe(res => {
      alert(res.message)
      this.router.navigate(['/login'])
    }, err => alert(err.error))
  }
  Islogin() {
    return (localStorage.getItem('token')&&!this.isTokenExpired()) ? true : false;
  }
  isTokenExpired(){
    const helper = new JwtHelperService();
    let exp=helper.isTokenExpired(localStorage.getItem('token') as string)
    return exp
    
  }
  isadmin(){
    if(this.getRole()=="Admin"){
      return true
    }
    else
    {
      return false
    }
  }
  Logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  Validate(otp: string) {
    
    this.http.post<{ token: string, message: string }>(this.url + `/Authenticate/verify?otp=${otp}`, null).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token)
        let role: string = this.getRole()
        if (role == "Admin") {
          this.router.navigate(['/admin'])
        }
        else {
          this.router.navigate(['/user'])
        }

      }, error: (err) => {
        console.log(err.error)
        this.errorMessage=err.error
        this.router.navigate(['/login'])
      },
    })
    
  }
  getRole(): string {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token') as string);
    let roleval =decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    return roleval
  }
  ResetPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url + `/Authenticate/forgotpassword?Email=${email}`, null)
  }
  UpdatePassword(Otp: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url + `/Authenticate/updatePassword?otp=${Otp}&password=${password}`, null)
  }
  UpdateProfile(UpdateData: UserUpdateModel, id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.url + `/User?id=${id}`, UpdateData)
  }
  UpdateProfileImg(imgsrc: string, id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.url + `/User/profile?id=${id}&url=${imgsrc}`, null)
  }
  createOrder(amount: number, currency: string, receipt: string){
    const paymentData = {
      amount: amount,
      currency: currency,
      receipt: receipt
    };
    return this.http.post<{orderId: string}>(this.url+'/Payment/create-order', paymentData);
  }
  getPayment(paymentId:string){
    return this.http.get<{res:string}>(this.url+'/Payment/get-payment?paymentId='+paymentId)
  }
  getpath() {
    if (this.Islogin()) {
      return '/course-data';
    } else {
      return '/course';
    }
  }
  addPayment(paymentData:PaymentInput){
    return this.http.post<{message:string}>(this.url+'/Payment',paymentData)
  }
  getpaymentDetails(id:number){
    return this.http.get<EarningModel>(this.url+`/Purchase/userpurchase/${id}`)
  }
}
