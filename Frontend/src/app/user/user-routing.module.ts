import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { CoursedetailsComponent } from '../default/Components/coursedetails/coursedetails.component';
import { CoursefilterComponent } from '../default/Components/coursefilter/coursefilter.component';
import { CartComponent } from './components/cart/cart.component';
import { CompletecheckoutComponent } from './components/completecheckout/completecheckout.component';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { AuthGuard } from '../Guards/auth.guard';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: '/courses', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'course-data/:coursename', component: CoursedetailsComponent },
      { path: 'Allcourses/:name', component: CoursefilterComponent },
      { path: 'cart', component: CartComponent },
      { path: 'mylearnings', component: MyLearningComponent },
      {
        path: 'Courses/:name', component: CourseLayoutComponent, children: [
          { path: 'topics', component: TopicDetailComponent },
          { path: 'video', component: PlayerComponent },
        ]
      },
      { path: 'history', component: PurchaseHistoryComponent },
    ],canActivate:[AuthGuard]
  },
  { path: 'cart/checkout', component: CompletecheckoutComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
