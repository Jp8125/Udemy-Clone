import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { StoreService } from '../../Services/store.service';
import { Category, CategoryDto } from '../../../Interfaces/category';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  category!:FormGroup
  subCategory!:FormGroup
  categoryArray!:Array<Category>
  constructor(private fb:FormBuilder,private adminService:AdminService,private storeService:StoreService){
    this.category=this.fb.group({
        categoryName: ['',[Validators.required]],
        parentCategoryId: ['',[Validators.required]]  
    })
    this.storeService.getCategory().subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.categoryArray=res;
        },
        error:(err)=>{
          console.log(err.message);
        }
      }
    )
  }
  Add(){
    let category:CategoryDto
    if(this.category.get('parentCategoryId')?.value=="null"){
       category={categoryName:this.category.get('categoryName')?.value as string, parentCategoryId:null}
    }
    else{
      category=this.category.value;
    }
    this.adminService.AddCategory(category).subscribe({
      next(res) {
        alert(res.message)
      },
      error(msg) {
        console.log('Error: ', msg);
      }
    })
  }
}
