import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddCourseComponent } from './Components/add-course/add-course.component';
import { CourselistComponent } from './Components/courselist/courselist.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddcategoryComponent } from './Components/addcategory/addcategory.component';
import { AddTopicsComponent } from './Components/add-topics/add-topics.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HomeComponent } from './Components/home/home.component';
import { AddSubtopicComponent } from './Components/add-subtopic/add-subtopic.component';
import { DefaultModule } from '../default/default.module';
import { AddMediaComponent } from './Components/add-media/add-media.component';
import { UsersComponent } from './Components/users/users.component';
import { EarningsComponent } from './Components/earnings/earnings.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoursePreviewComponent } from './Components/course-preview/course-preview.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { SortPipe } from './Pipe/sort.pipe';

import { UserSortingPipe } from './Pipe/user-sorting.pipe';
import { UserSearchingPipe } from './Pipe/user-searching.pipe';


@NgModule({
  declarations: [
    AddCourseComponent,
    CourselistComponent,
    DashboardComponent,
    NavbarComponent,
    AddcategoryComponent,
    AddTopicsComponent,
    AddUserComponent,
    HomeComponent,
    AddSubtopicComponent,
    AddMediaComponent,
    UsersComponent,
    EarningsComponent,
    CoursePreviewComponent,
    UserDetailComponent,
    FilterPipe,
    SortPipe,
    UserSortingPipe,
    UserSearchingPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DefaultModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
