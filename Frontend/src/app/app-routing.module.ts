import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { ServerErrorComponent } from './server-error/server-error.component';

const routes: Routes = [
  { path: '', loadChildren:()=>import('./default/default.module').then(m=>m.DefaultModule) },
  {
    path: 'user', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[AuthGuard]
  },
  {
    path: 'admin', 
    loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'serverError', component: ServerErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
