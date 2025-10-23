import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { Course, Courses } from '../../../Interfaces/course';
import { Category } from '../../../Interfaces/category';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/Interfaces/CourseState.model';
import { AddCourses } from 'src/app/CourseStore/course.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  CourseForm!: FormGroup;
  Categories!: Array<Category>;
  FilterCategories!: Array<Category>;
  SubCategoryfilter!: Array<Category>;
  courseCategory!: Array<Category>;
  issubmited:boolean=false
  showError:boolean=false
  fileerror:boolean=false
  myfile!: File;
  constructor(private fb: FormBuilder, private adminservice: AdminService,private courseStore:Store<CourseState>) {
    this.CourseForm = this.fb.group({
      name: ['', [Validators.required]],
      maincategory: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required,Validators.pattern(/^\d+$/),Validators.max(100000),Validators.min(0)]],
      description: ['', [Validators.required,Validators.maxLength(750)]],
      duration: ['', [Validators.required,Validators.pattern(/^\d+$/),Validators.max(100),Validators.min(1)]],
      thumbnailSrc: ['', [Validators.required]],
    });
    this.adminservice.GetCategories().subscribe((res) => {
      console.log(res);
      this.Categories = res;
      this.courseCategory = res.filter((obj) => obj.parentCategoryId == null);
    });
  }
  Method1(event: any) {
    this.myfile = event.target.files[0];
    console.log(this.myfile);
    if(this.myfile.type!="image/png"){
      this.fileerror=true
    }
  }
  Add() {
    this.issubmited=true
    if (this.CourseForm.invalid) {
      this.showError=true
      setTimeout(()=>{
        this.showError=false
      },2000)
    } else {
      let formdata = new FormData();
      formdata.append('file', this.myfile);
      console.log(formdata);

      this.adminservice.getUrl(formdata).subscribe({
        next: (res) => {
          let coursedata: Course = {
            name: this.CourseForm.get('name')?.value,
            categoryId: this.CourseForm.get('categoryId')?.value,
            thumbnailSrc: res.url,
            description: this.CourseForm.get('description')?.value,
            duration: this.CourseForm.get('duration')?.value,
            price: this.CourseForm.get('price')?.value,
          };
          this.courseStore.dispatch(AddCourses({Course:coursedata}))
          alert("course added")
        },
        error(err) {
          console.log(err.error);
        },
      });
    }
  }
  get categoryid() {
    return this.CourseForm.get('maincategory')?.value as number;
  }
  get subcategoryid() {
    return this.CourseForm.get('subcategory')?.value as number;
  }
  firstFilter(id: number) {
    this.FilterCategories = this.Categories.find((obj) => obj.categoryId == id)
      ?.subCourses as Array<Category>;
  }
  secondFilter(id: number) {
    this.SubCategoryfilter = this.FilterCategories.find(
      (obj) => obj.categoryId == id
    )?.subCourses as Array<Category>;
  }
}
