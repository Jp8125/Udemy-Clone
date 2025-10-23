import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseState } from './Interfaces/CourseState.model';
import { LoadCourses } from './CourseStore/course.actions';
import { CategoryState } from './Interfaces/CategoryState.model';
import { LoadCategory } from './CatergoryStore/Category.actions';
import { CheckService } from './Services/check.service';
import { Router } from '@angular/router';
import { Loadwithoutsub } from './allCategoryStore/allCategory.action';
import { allCategoryStore } from './Interfaces/allcategoryStore.model';
import { allCategories } from './allCategoryStore/allCategory.selectors';
import { UserStateService } from './user/Services/user.state.service';
import { CartStore } from './Interfaces/CartStore.model';
import { selectallCarts } from './CartStore/carts.selectors';
import { loadcarts } from './CartStore/carts.actions';
import { selectallCourse } from './CourseStore/course.selectors';
import { UserStateModel } from './Interfaces/user-state.model';
import { loadUsers } from './Userstore/user.action';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Frontend';
  constructor(private auth:AuthService,private checkService:CheckService,private router:Router,private store: Store<CourseState>, private userstore: Store<UserStateModel>, private categoryState: Store<CategoryState>,  private category: Store<allCategoryStore>) {
    this.checkService.checkConnection().subscribe({
      next:(value)=>{
        this.category.dispatch(Loadwithoutsub())
        this.store.dispatch(LoadCourses())
        this.categoryState.dispatch(LoadCategory())
        if(this.auth.Islogin()){
          if(this.auth.getRole()=='Admin'){
            this.userstore.dispatch(loadUsers())
          }
        }
          this.router.navigate(['/'])
      },
      error:(err)=>{
          this.router.navigate(['/serverError'])
      },
    })
  }
}
