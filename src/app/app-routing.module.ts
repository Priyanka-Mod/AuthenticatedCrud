import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDetailComponent} from './user-detail/user-detail.component'
import { LogInComponent } from './log-in/log-in.component';
import { ShowUserDetailComponent } from './show-user-detail/show-user-detail.component';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
// import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'',redirectTo:"/login" , pathMatch:'full'},
  {path:"login",component:LogInComponent},
  {path:"form", component:UserDetailComponent},
  {path:"form/:id", component:UserDetailComponent},
  {path:'user-detail',component:ShowUserDetailComponent},
  {path:'user-detail/:id',component:ShowUserDetailComponent},
  {path:'user-list', component:ShowAllUsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }