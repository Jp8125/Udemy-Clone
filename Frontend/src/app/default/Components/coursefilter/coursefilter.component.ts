import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Interfaces/category';
import { Courses } from 'src/app/Interfaces/course';
import { AuthService } from 'src/app/Services/auth.service';
import { FilterService } from 'src/app/user/Services/filter.service';

@Component({
  selector: 'app-coursefilter',
  templateUrl: './coursefilter.component.html',
  styleUrls: ['./coursefilter.component.css'],
})
export class CoursefilterComponent {
  page:number=1
  show=false
  Filteredcourses: Array<Courses> = [];
  newCourses:Array<Courses>=[]
  popularCourses:Array<Courses>=[]
  filteredCategory!: Array<Category>;
  FilterName!: string;
  route!: string;
  paramFilter:Array<Courses>=[]
  short!:boolean
  sm!:boolean
  medium!:boolean
  long!:boolean
  free!:boolean
  paid!:boolean
  filterIds:number[]=[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private filterserv: FilterService,
    private router:Router
  ) {
    
    this.route=this.auth.getpath()
    this.activatedRoute.params.subscribe((res) => {
      this.FilterName = res['name'];
      this.filteredCategory = this.filterserv.getFIlterCategory( this.FilterName);
      this.Filteredcourses=this.filterserv.GetFIlteredCourses(this.filteredCategory);
      this.paramFilter=this.Filteredcourses
      this.getNewcourses()
      this.getpopularCourses()
    });
    
  }
  getNewcourses(){
     this.newCourses=[...this.Filteredcourses].sort((a,b)=>new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
  }
  getpopularCourses(){
     this.popularCourses=[...this.Filteredcourses].sort((a,b)=>a.popularity-b.popularity)
     this.popularCourses.forEach(obj=>console.log(obj.popularity,obj.name)
     )
  }
  filter(){
    // this.paramFilter=[]
    console.log(this.short,this.sm,this.long,this.medium);
    let filteredCourses = [...this.Filteredcourses];
 
    if (this.long) {
      filteredCourses = filteredCourses.filter(course => course.duration > 16);
    }
    if (this.medium) {
      filteredCourses = filteredCourses.filter(course => course.duration >= 10 && course.duration <= 16);
    }
    if (this.sm) {
      filteredCourses = filteredCourses.filter(course =>course.duration >= 4 &&course.duration <= 10);
    }
    if (this.short) {
      filteredCourses = filteredCourses.filter(course => course.duration < 4);
    }
    
    if (this.free && !this.paid) {
      filteredCourses = filteredCourses.filter(course => course.price === 0);
    }
    if (this.paid && !this.free) {
      filteredCourses = filteredCourses.filter(course => course.price > 0);
    }
    if (this.filterIds.length > 0) {
      filteredCourses = filteredCourses.filter(course => this.filterIds.includes(course.categoryId));
    }
  
    this.paramFilter=filteredCourses
    console.log(this.filterIds);
  }
 filterId(id:number){
  if (this.filterIds.includes(id)) {
    this.filterIds = this.filterIds.filter(id => id !== id);
  } else {
    this.filterIds.push(id);
  }
  this.filter()
 }
}