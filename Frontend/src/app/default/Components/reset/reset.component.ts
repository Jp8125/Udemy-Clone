import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
otp!:string
password!:string
regex=new RegExp(/^\d+$/);
constructor(private service:AuthService,private router:Router){}
Update(){
this.service.UpdatePassword(this.otp,this.password).subscribe({
  next:(value)=>{
      alert(value.message)
      this.router.navigate(['/login'])
    },
    error:(err)=>{
        alert(err.error)
        this.router.navigate(['/forgot'])
    },
})
}
}
