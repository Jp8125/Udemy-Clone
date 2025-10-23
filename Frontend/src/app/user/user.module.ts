import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DefaultModule } from '../default/default.module';
import { CartComponent } from './components/cart/cart.component';
import { CompletecheckoutComponent } from './components/completecheckout/completecheckout.component';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { CourseLayoutComponent } from './components/course-layout/course-layout.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { PlayerComponent } from './components/player/player.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    ProfileComponent,
    EditProfileComponent,
    CartComponent,
    CompletecheckoutComponent,
    MyLearningComponent,
    CourseLayoutComponent,
    TopicDetailComponent,
    PurchaseHistoryComponent,
    PlayerComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
