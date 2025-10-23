import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { Store } from '@ngrx/store';
import { UserStateModel } from 'src/app/Interfaces/user-state.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm!:FormGroup
  constructor(private fb:FormBuilder,private adminService:AdminService,private userStore:Store<UserStateModel>){
this.userForm=this.fb.group({
  name: ['',[Validators.required]],
  email: ['',[Validators.required,Validators.email]],
  phonNo: ['',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(10),Validators.minLength(10)]]
})
  }
  Add(){
  if(this.userForm.invalid){
    alert("pls fill the form")
  }
  else
  {
    this.adminService.AddUser(this.userForm.value).subscribe({
      next(res) {
        console.log(res);
        alert("user added");
      },
      error(msg) {
        console.log('Error: ', msg);
      }
    })
  }
  }
}
