import { Component, OnInit } from '@angular/core';
import { Courses } from '../../../Interfaces/course';
import { CourseService } from '../../Services/course.service';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { AdminService } from 'src/app/Admin/Services/admin.service';
import { FilterService } from '../../Services/filter.service';
import { Category } from 'src/app/Interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
 
  courses: Courses[] = [];
  filterCategories: Array<Category> = [];
  ShortCourses: Array<Courses> = [];
  newCourses: Array<Courses> = [];
  categoryNames: Array<string> = [];
  FilteredList: { array: Array<Courses>; name: string }[] = [];
  constructor( private CourseStore: Store<CourseState>, private categories: AdminService,private filter: FilterService,private router: Router) {
    this.GetCourses();
  }
  GetCourses(){
    this.CourseStore.select(selectallCourse).subscribe({
        next: (value) => {
          this.courses = value;

          this.filterShortCourses()
          this.FilterBytime()
          this.GetCategory()
        },
      });
    }
  filterShortCourses() {
    this.ShortCourses = this.courses.filter((course) => course.duration <= 8);

  }
  FilterBytime() {
    this.newCourses = [...this.courses].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())

  }
  GetCategory(){
    this.categories.GetAllCategories().subscribe({
      next: (res) => {       
        for (const category of res) {
          if (category.parentCategoryId != null) {
            this.categoryNames.push(category.categoryName);
          }
        }
        this.GetfilteredCourses();
      },
    });
  }

  GetfilteredCourses() {
    let prev:Array<number>=[]
    for (let i = 0; i < 6; i++) {
      let list: Array<Courses> = [];
      let index = Math.floor(Math.random() * this.categoryNames.length);
      if(!prev.includes(index)){
        let categoryName = this.categoryNames[index];
        this.filterCategories = this.filter.getFIlterCategory(categoryName);
        for (const category of this.filterCategories) {
          list.push(...this.courses.filter((c) => c.categoryId == category.categoryId));
        }
        this.FilteredList.push({ array: list, name: categoryName })
        prev.push(index)
      }
    }
  
  }
  // check<T>(data: Array<T>) {
  //   console.log(data.length);
  //   let url = this.router.url
  //   if (data.length == 0) {
  //     this.router.navigate([url])
  //   }
  // }
}
