import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  email!:string
  regex=new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g);
constructor(private service:AuthService,private router:Router){}
Reset(){
  this.service.ResetPassword(this.email).subscribe({
    next:(res)=>
    {
      alert(res.message)
      this.router.navigate(['/reset'])
    }
    ,error:(err)=>{
      alert(err.error)
    }
  })
}
}
