import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { DefaultModule } from './default/default.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AdminModule } from './Admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { CommonModule } from '@angular/common';
import { CourseReducer } from './CourseStore/course.reducers';
import { CourseEffect } from './CourseStore/course.effects';
import { cateGoryReducer } from './CatergoryStore/Category.reducers';
import { CategoryEffects } from './CatergoryStore/Category.effects';
import {allCategoryReducer } from './allCategoryStore/allCategory.reducer';
import { CourseCategoryEffects } from './allCategoryStore/allcategory.effects';
import { Cartreducer } from './CartStore/carts.reducers';
import { CartEffect } from './CartStore/carts.effects';
import { PurchaseEffect } from './PurchaseStore/purchase.effects';
import { purchaseReducer } from './PurchaseStore/purchase.reducers';
import { UserEffects } from './Userstore/user.effects';
import { userReducer } from './Userstore/user.reducers';
import { TokenInterceptor } from './InterCeptors/token.interceptor';
import { ProgressEffect } from './ProgressStore/progress.effect';
import { ProgressReducer } from './ProgressStore/progress.reducer';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    DefaultModule,
    HttpClientModule,
    AdminModule,
    StoreModule.forRoot({course:CourseReducer,category:cateGoryReducer,categories:allCategoryReducer,cart:Cartreducer,purchase:purchaseReducer,users:userReducer,progress:ProgressReducer}, {}),
    EffectsModule.forRoot([CourseEffect,CategoryEffects,CourseCategoryEffects,CartEffect,PurchaseEffect,UserEffects,ProgressEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
