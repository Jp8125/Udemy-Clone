import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  Isvalid:number=0;
  success:string=""
  tost:string=this.authService.errorMessage
  formSubmitted: boolean = false;

constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required]]
  });
this.removerToast()
}
SentOtp(){
this.formSubmitted=true
if(this.loginForm.invalid){
  console.log("invalid");
}
else
{
  this.authService.Login(this.loginForm.value).subscribe({next:(res)=>{
    // this.tost=""
    this.Isvalid=1;
    this.authService.canVerify=true;
    this.success=res.message
    setTimeout(() => {
      this.router.navigate(['/verify'])
    }, 1500);
    
},error:(err)=>{
  this.tost=err.error
  this.removerToast()
},})
}
setTimeout(() => {
  this.formSubmitted = false;
}, 5000);
}
removerToast(){
  setTimeout(() => {
    this.tost=""
  }, 1500);
}
}
