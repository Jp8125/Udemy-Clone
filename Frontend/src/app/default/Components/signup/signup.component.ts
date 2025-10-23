import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!:FormGroup
  formSubmitted: boolean = false;
constructor(private  fb:FormBuilder,private authService:AuthService) {
  this.signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phonNo: ['', [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.maxLength(10),Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)]]
  });
}
Signup(){
  this.formSubmitted = true;
  if(this.signupForm.invalid){
    console.log("invalid");
  }
  else
  {
    this.authService.Signup(this.signupForm.value)
  }
  setTimeout(() => {
    this.formSubmitted = false;
  }, 5000);
}

}
