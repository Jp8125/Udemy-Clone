import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddCourseComponent } from './Components/add-course/add-course.component';
import { AddTopicsComponent } from './Components/add-topics/add-topics.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { AddcategoryComponent } from './Components/addcategory/addcategory.component';
import { CourselistComponent } from './Components/courselist/courselist.component';
import { HomeComponent } from './Components/home/home.component';
import { AddSubtopicComponent } from './Components/add-subtopic/add-subtopic.component';
import { AdminGuard } from '../Guards/admin.guard';
import { AuthGuard } from '../Guards/auth.guard';
import { UsersComponent } from './Components/users/users.component';
import { AddMediaComponent } from './Components/add-media/add-media.component';
import { EarningsComponent } from './Components/earnings/earnings.component';
import { CoursePreviewComponent } from './Components/course-preview/course-preview.component';

const routes: Routes = [
  {
    path: '',redirectTo:'/admin-route/dashboard/Courses',pathMatch:'full'
  },
  { path: 'admin-route', component: HomeComponent , children: [
    { path: 'dashboard', component: DashboardComponent,children:[
      { path: 'Courses', component: CourselistComponent },
      { path: 'Users', component: UsersComponent },
      { path: 'Earnings', component: EarningsComponent },
    ] },
    { path: 'add-course', component: AddCourseComponent },
    { path: 'add-topic', component: AddTopicsComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'add-category', component: AddcategoryComponent },
    { path: 'add-subtopic', component: AddSubtopicComponent },
    { path: 'add-media', component: AddMediaComponent },
    { path: 'preview/:course', component: CoursePreviewComponent },
  ],canActivate:[AuthGuard,AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
