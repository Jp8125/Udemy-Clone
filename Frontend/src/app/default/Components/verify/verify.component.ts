import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  Otp!:string
  regex=new RegExp(/^\d+$/);
  constructor(private authService:AuthService){}
  Verify(){
    this.authService.Validate(this.Otp)
  }
}
