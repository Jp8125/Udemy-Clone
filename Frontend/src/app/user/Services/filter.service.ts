import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { allCategory } from 'src/app/CatergoryStore/Category.selectors';
import { selectallCourse } from 'src/app/CourseStore/course.selectors';
import { CategoryState } from 'src/app/Interfaces/CategoryState.model';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { Category } from 'src/app/Interfaces/category';
import { Courses } from 'src/app/Interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  Categories!: Array<Category>;
  Courses!:Array<Courses>
  Filteredcourses:Array<Courses>=[]
  constructor( private categoryStore: Store<CategoryState>,private store:Store<CourseState>) {
    this.categoryStore.select(allCategory).subscribe((res) => {
      this.Categories = res;
    });
    this.store.select(selectallCourse).subscribe({
      next: (value) => {
        this.Courses = value;
    
      },})
  }
  getFIlterCategory(name:string){
    let filteredCategory: Array<Category>=this.findLeafCategories(this.Categories, name);
    if(filteredCategory.length==0){
      filteredCategory=this.onlyLeaf(this.Categories, name)
    }
    return filteredCategory
  }
  findLeafCategories(categories: Category[], parentName: string): Category[] {
    const leafCategories: Category[] = [];
    for (const category of categories) {
      if (category.categoryName === parentName) {
        leafCategories.push(...this.getLeafCategories(category.subCourses));
      } else {
        leafCategories.push(...this.findLeafCategories(category.subCourses, parentName));
      }
    }
    return leafCategories;
  }
  getLeafCategories(categories: Category[]): Category[] {
    const leafCategories: Category[] = [];
    for (const category of categories) {
      if (category.subCourses.length === 0) {
        leafCategories.push(category);
      } else {
        leafCategories.push(...this.getLeafCategories(category.subCourses));
      }
    }
    return leafCategories;
  }
  onlyLeaf(categories: Category[], categoryName: string): Category[] {
    const leafCategories: Category[] = [];

    for (const category of categories) {
      if (category.categoryName === categoryName && category.subCourses.length === 0) {
        leafCategories.push(category);
      } else {
        leafCategories.push(...this.onlyLeaf(category.subCourses, categoryName));
      }
    }
    return leafCategories;
  }
  GetFIlteredCourses(categoryArray:Array<Category>){
    this.Filteredcourses = [];
    for (const iterator of categoryArray) {
      this.Filteredcourses = [
        ...this.Filteredcourses,
        ...this.Courses.filter((c) => c.categoryId == iterator.categoryId),
      ];
    }
    return this.Filteredcourses
  }
}
