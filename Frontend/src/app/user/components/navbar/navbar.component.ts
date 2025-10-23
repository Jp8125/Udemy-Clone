import { Component } from '@angular/core';
import { Category, Categorysub } from 'src/app/Interfaces/category';
import { UserModel } from '../../../Interfaces/user.model';
import { UserStateService } from '../../Services/user.state.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Store } from '@ngrx/store';
import { CategoryState } from 'src/app/Interfaces/CategoryState.model';
import { allCategory } from 'src/app/CatergoryStore/Category.selectors';
import { allCategoryStore } from 'src/app/Interfaces/allcategoryStore.model';
import { allCategories } from 'src/app/allCategoryStore/allCategory.selectors';
import { CartStore } from 'src/app/Interfaces/CartStore.model';
import { cartNumbers } from 'src/app/CartStore/carts.selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  id!: number
  user!: UserModel
  categories!: Array<Category>
  allCategories: Array<Categorysub> = []
  filter: Categorysub[] = [];
  display: boolean = true
  keyword: string = ""
  cartitems:Observable<number>=of(0)
  constructor(private userState: UserStateService, private authService: AuthService, private CategoryStore: Store<CategoryState>, private category: Store<allCategoryStore>,private cartStore:Store<CartStore>) {
    this.CategoryStore.select(allCategory).subscribe(res => this.categories = res)
    this.userState.User.subscribe({
      next: (res) => {
        this.user = res
      }
    })
    this.category.select(allCategories).subscribe(res => {
      this.allCategories = res
    })
    this.cartitems=this.cartStore.select(cartNumbers)
  }
  Logout() {
    this.authService.Logout();
  }
  filterCategory() {
    let categorytoFilter = [...this.allCategories]
    this.filter = categorytoFilter.filter(obj => obj.categoryName.toLowerCase().includes(this.keyword)).slice(0,8)
  }
  removelist() {
    setTimeout(() => {
      this.display = false
    }, 230);
  }
}
