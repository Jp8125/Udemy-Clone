import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { VerifyComponent } from './Components/verify/verify.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { ResetComponent } from './Components/reset/reset.component';
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { CoursefilterComponent } from './Components/coursefilter/coursefilter.component';
import { CoursedetailsComponent } from './Components/coursedetails/coursedetails.component';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { DynamicCarouselComponent } from './Components/dynamic-carousel/dynamic-carousel.component';
import { NestedFilterComponent } from './Components/nested-filter/nested-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    VerifyComponent,
    ForgotComponent,
    ResetComponent,
    LandingpageComponent,
    CoursefilterComponent,
    CoursedetailsComponent,
    ServerErrorComponent,
    DynamicCarouselComponent,
    NestedFilterComponent,
    FooterComponent,
   
    
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports:[
    DynamicCarouselComponent,
    FooterComponent
  ]
})
export class DefaultModule { }
