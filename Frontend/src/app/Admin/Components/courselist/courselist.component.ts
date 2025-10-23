import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditCourse, deleteControl } from 'src/app/CourseStore/course.actions';
import {selectallCourse} from 'src/app/CourseStore/course.selectors';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { CourseUpdate, Courses } from 'src/app/Interfaces/course';
import { AdminService } from '../../Services/admin.service';
import { Category, Categorysub } from 'src/app/Interfaces/category';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent {
  page: number = 0
  sortmethod!: number
  keyword:string=""
  Courses!: Observable<Array<Courses>>
  updateForm!:FormGroup
  categories!:Array<Category>
  courseid!:number
  constructor(private courseStore: Store<CourseState>,private fb:FormBuilder,private adminservice:AdminService) {
    this.Courses = this.courseStore.select(selectallCourse)
    this.updateForm=this.fb.group({
      name: [''],
      categoryId:[''],
      price: [''],
      description: [''],
      duration: [''],
    })
    this.adminservice.GetAllCategories().subscribe((res) => {
      this.categories = res.filter(obj=>obj.parentCategoryId!=null);
    });
  }
  onDelete(id: number) {
    this.courseStore.dispatch(deleteControl({ id }))
  }
  getDate(str: string) {
    var dt = new Date(str);
    return dt.toDateString();
  }
  OnEdit(value:Courses){
    this.courseid=value.courseId
    let data:CourseUpdate={name:value.name,duration:value.duration,description:value.description,price:value.price,categoryId:value.categoryId}
    this.updateForm.patchValue(data)
  }
  onUpdate(){
    this.courseStore.dispatch(EditCourse({data:this.updateForm.value,id:this.courseid}))
  }
}
