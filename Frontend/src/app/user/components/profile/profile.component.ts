import { Component } from '@angular/core';

import { UserModel } from '../../../Interfaces/user.model';
import { UserStateService } from '../../Services/user.state.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id:number=0
  user:UserModel={} as UserModel
constructor(private userService:UserStateService){
this.userService.User.subscribe({
  next:(res)=>{
    this.user=res
  }
})
}
}