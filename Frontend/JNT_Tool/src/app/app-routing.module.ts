import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { CouponsComponent } from './couponComponents/coupons/coupons.component';
import { AddComponent } from './couponComponents/add/add.component';
import { EditComponent } from './couponComponents/edit/edit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateProjectDialogComponent } from './crudProjectComponents/create-project-dialog/create-project-dialog.component';
import { UpdateButtonComponent } from './crudProjectComponents/update-button/update-button.component';
import { DashboardComponent } from './crudProjectComponents/dashboard/dashboard.component';
import { ProjectReportComponent } from './project-report/project-report.component';

import { LeavestatusComponent } from './lms component/leavestatus/leavestatus.component';

import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { SalaryReportComponent } from './SalaryReport/salary-report/salary-report.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ConfirmationDialogComponent } from './crudProjectComponents/confirmation-dialog/confirmation-dialog.component';
// import { ConfirmationDialogComponent } from './crudProjectComponents/confirmation-dialog/confirmation-dialog.component';
import { HRComponent } from './HR/hr/hr.component';




const routes: Routes = [
  { path: "mainpage", component: TenantListComponent, canActivate: [AuthGuard] },
    { path: "add", component: AddComponent, canActivate: [AuthGuard] },
    { path: "coupons", component: CouponsComponent, canActivate: [AuthGuard] },
    { path: "edit", component:EditComponent,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'update', component: UpdateButtonComponent, canActivate: [AuthGuard] },
    { path: 'create-project-dialog', component: CreateProjectDialogComponent, canActivate: [AuthGuard] },
    { path: 'confirmation-dialog', component: ConfirmationDialogComponent, canActivate: [AuthGuard] },
    { path: 'projectReport', component: ProjectReportComponent, canActivate: [AuthGuard] },
    { path: 'taskDashboard', component: TaskDashboardComponent, canActivate: [AuthGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
     { path: "mainpage", component: TenantListComponent, canActivate: [AuthGuard] }, { path: "signup", component: SignupComponent},
    
  
      { path: 'leaveStatus', component: LeavestatusComponent, canActivate: [AuthGuard] },
    {path:'salary-report',component:SalaryReportComponent , canActivate: [AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'attendanceReport', component:AttendanceReportComponent,canActivate:[AuthGuard] },
    { path: 'HR', component:HRComponent,canActivate:[AuthGuard] },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }

