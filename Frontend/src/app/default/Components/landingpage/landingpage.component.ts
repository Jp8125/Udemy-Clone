import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { allCategory } from 'src/app/CatergoryStore/Category.selectors';
import { LoadCourses } from 'src/app/CourseStore/course.actions';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { CategoryState } from 'src/app/Interfaces/CategoryState.model';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Category } from 'src/app/Interfaces/category';
import { Courses } from 'src/app/Interfaces/course';
import { FilterService } from 'src/app/user/Services/filter.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  courses: Courses[] = [];
  paopularCourses:Array<Courses>=[]
  categories:Array<Category>=[];
  categoryName:Array<{name:string,id:number}>=[]
  constructor(private CourseStore:Store<CourseState>,private CategoryStore:Store<CategoryState>,private filter:FilterService,private source:AdminService){
    this.CourseStore.select(selectallCourse).subscribe({
      next: (value) => {
        this.courses = value;
        this.getPopularCourses()
      },
    });
    this.source.GetAllCategories().subscribe(res=>{
      res.forEach((category,i)=>{
        if (category.parentCategoryId != null&&i<7) {
          this.categoryName.push({name:category.categoryName,id:category.categoryId});
        }
      })
      this.categoryName.sort((a,b)=>a.name.length-b.name.length)
    });
    this.CategoryStore.select(allCategory).subscribe(res=>{
      this.categories=res
    })
  }
 tabfilter(name:string){
  let filtercategories=this.filter.findLeafCategories(this.categories,name)

  if(filtercategories.length==0)
  {
    filtercategories=this.filter.onlyLeaf(this.categories,name)
  }
  return this.filter.GetFIlteredCourses(filtercategories)
 }
 getPopularCourses(){
  this.paopularCourses=[...this.courses].sort((a,b)=>a.popularity-b.popularity)
  console.log(this.paopularCourses);
  
 }
}
