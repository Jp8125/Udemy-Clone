import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateModel } from 'src/app/Interfaces/user-state.model';
import { loadUsers } from 'src/app/Userstore/user.action';
import { allUsers } from 'src/app/Userstore/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
