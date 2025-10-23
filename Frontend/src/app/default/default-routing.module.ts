import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { VerifyComponent } from './Components/verify/verify.component';
import { VerificationGuard } from '../Guards/verification.guard';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { ResetComponent } from './Components/reset/reset.component'
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { CoursedetailsComponent } from './Components/coursedetails/coursedetails.component';
import { CoursefilterComponent } from './Components/coursefilter/coursefilter.component';
import { NestedFilterComponent } from './Components/nested-filter/nested-filter.component';
import { AuthGuard } from '../Guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // { path: '', redirectTo:'/landing',pathMatch:'full' },
      { path: '', component: LandingpageComponent},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'verify',
        component: VerifyComponent,
        canActivate: [VerificationGuard],
      },
      { path: 'forgot', component: ForgotComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'course/:name', component:CoursedetailsComponent },
      { path: 'courses/:name', component: CoursefilterComponent,children:[
        { path: 'courses/:name', component:NestedFilterComponent },
      ] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule { }
