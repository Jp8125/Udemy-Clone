import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { allCategory } from 'src/app/CatergoryStore/Category.selectors';
import { CategoryState } from 'src/app/Interfaces/CategoryState.model';
import { allCategoryStore } from 'src/app/Interfaces/allcategoryStore.model';
import { Category, Categorysub } from 'src/app/Interfaces/category';
import { allCategories } from 'src/app/allCategoryStore/allCategory.selectors';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories!:Array<Category>
  allCategories:Array<Categorysub>=[]
  filter:Array<Categorysub>=[]
  keyword:string=""
  display:boolean=true
  constructor(private CategoryStore:Store<CategoryState>,private category:Store<allCategoryStore>){
    this.CategoryStore.select(allCategory).subscribe({
      next:(res)=>{
        this.categories=res
      }
    })
    this.category.select(allCategories).subscribe(res=>{
      this.allCategories=res
    })
    }
    filterCategory(){
      let categorytoFilter=[...this.allCategories]
      this.filter=categorytoFilter.filter(obj=>obj.categoryName.toLowerCase().includes(this.keyword)).sort((a,b)=>a.categoryName.length-b.categoryName.length).slice(0,8)
    }
    removelist(){
      setTimeout(() => {
        this.display=false
     }, 230);
    }
}
