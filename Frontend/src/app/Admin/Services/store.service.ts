import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Category } from '../../Interfaces/category';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  categoryStore!:BehaviorSubject<Array<Category>>

  constructor(private service:AdminService) {
    const init:Array<Category>=[]
    this.categoryStore=new BehaviorSubject(init)
    this.setCategory();
  }
 setCategory():void{
  this.service.GetAllCategories().subscribe({
    next:(res)=>{
      this.categoryStore.next(res)
    },
    error:(error)=>{
      console.log(error.message);
    }
  })
 }
 getCategory(){
  return this.categoryStore.asObservable()
 }
 getParentCategory(){
   return this.getCategory().pipe(map(res=>res.filter(obj=>obj.parentCategoryId==null)))
 }
}
