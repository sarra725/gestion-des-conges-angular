import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ControlComponent } from './layout/control/control.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashComponent } from './layout/dash/dash.component';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './conge/pages/userManagement/add-user/add-user.component';
import { ListUserComponent } from './conge/pages/userManagement/list-user/list-user.component';
import { ListLeaveComponent } from './conge/pages/leaveManagement/list-leave/list-leave.component';
import { AddLeaveComponent } from './conge/pages/leaveManagement/add-leave/add-leave.component';
import { CalendarComponent } from './conge/pages/calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LeaveUserComponent } from './conge/pages/leave-user/leave-user.component';
import { LeaveUserAddComponent } from './conge/pages/leave-user-add/leave-user-add.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ControlComponent,
    FooterComponent,
    DashComponent,
    LoginComponent,
    AddUserComponent,
    ListUserComponent,
    ListLeaveComponent,
    AddLeaveComponent,
    CalendarComponent,
    LeaveUserComponent,
    LeaveUserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
