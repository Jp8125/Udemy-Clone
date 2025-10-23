import { Component } from '@angular/core';
import { UserModel } from 'src/app/Interfaces/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserStateModel } from 'src/app/Interfaces/user-state.model';
import { allUsers } from 'src/app/Userstore/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
p:number=0
keyword:string=""
users!:Observable<Array<UserModel>>
constructor(private userstore:Store<UserStateModel>) {
  this.users=this.userstore.select(allUsers)
}
}
