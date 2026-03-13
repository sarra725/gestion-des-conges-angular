import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './layout/dash/dash.component';
import { LoginComponent } from './layout/login/login.component';
import { AddUserComponent } from './conge/pages/userManagement/add-user/add-user.component';
import { AddLeaveComponent } from './conge/pages/leaveManagement/add-leave/add-leave.component';
import { CalendarComponent } from './conge/pages/calendar/calendar.component';
import { ListUserComponent } from './conge/pages/userManagement/list-user/list-user.component';
import { ListLeaveComponent } from './conge/pages/leaveManagement/list-leave/list-leave.component';
import { LeaveUserComponent } from './conge/pages/leave-user/leave-user.component';
import { LeaveUserAddComponent } from './conge/pages/leave-user-add/leave-user-add.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"dash", component:DashComponent,
  canActivate:[AuthGuard],
   children:[
    {path:"user",component:ListUserComponent},
    {path:"user/add",component:AddUserComponent},
    {path:"conge",component:ListLeaveComponent},
    {path:"conge/add",component:AddLeaveComponent},
    {path:"congeuser",component:LeaveUserComponent},
    {path:"congeuser/add",component:LeaveUserAddComponent},
    {path:"calendar",component:CalendarComponent},
   ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
