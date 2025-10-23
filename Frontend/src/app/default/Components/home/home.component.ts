import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadCategory } from 'src/app/CatergoryStore/Category.actions';
import { LoadCourses } from 'src/app/CourseStore/course.actions';
import { CategoryState } from 'src/app/Interfaces/CategoryState.model';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { allCategoryStore } from 'src/app/Interfaces/allcategoryStore.model';
import { UserStateModel } from 'src/app/Interfaces/user-state.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CheckService } from 'src/app/Services/check.service';
import { loadUsers } from 'src/app/Userstore/user.action';
import { Loadwithoutsub } from 'src/app/allCategoryStore/allCategory.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor( private userstore: Store<UserStateModel>, private auth: AuthService, private router: Router) {

    if (this.auth.Islogin()) {
      let role = this.auth.getRole()
      if (role == "User") {
        this.router.navigate(['/user'])
      }
      else {

        this.router.navigate(['/admin'])
      }
    }
    else {
      this.auth.Logout();
      this.router.navigate(['../'])
    }
  }
}
