import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './couponComponents/edit/edit.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CouponsComponent } from './couponComponents/coupons/coupons.component';
import { AddComponent } from './couponComponents/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './crudProjectComponents/dashboard/dashboard.component';
import { ConfirmationDialogComponent } from './crudProjectComponents/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from './crudProjectComponents/create-project-dialog/create-project-dialog.component';
import { UpdateButtonComponent } from './crudProjectComponents/update-button/update-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common'; // Add this line
import { ProjectReportComponent } from './project-report/project-report.component';
import { SalaryReportComponent } from './SalaryReport/salary-report/salary-report.component';

import { LeavestatusComponent } from './lms component/leavestatus/leavestatus.component';
import { RouterModule } from '@angular/router';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { HRComponent } from './HR/hr/hr.component';



@NgModule({
  declarations: [
    AppComponent,
    TenantListComponent,
    SignupComponent,
    LoginComponent,

    HeaderComponent,DashboardComponent,ConfirmationDialogComponent,CreateProjectDialogComponent,UpdateButtonComponent,
    ProjectReportComponent,LeavestatusComponent,
    HeaderComponent,
    CouponsComponent,
    AddComponent,
    EditComponent,AttendanceReportComponent,
    CalendarComponent,
    TaskDashboardComponent,
    TaskDialogComponent,
    TaskUpdateComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    CreateProjectDialogComponent,
    UpdateButtonComponent,
    ProjectReportComponent,
    SalaryReportComponent,
    HRComponent,
    
 

  ],
  imports: [ 
    MatRadioModule,
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    MatCheckboxModule,
    MatSnackBarModule,
    MatMomentDateModule,FormsModule,NgxUiLoaderModule,MatButtonModule,
    MatIconModule,
    MatMomentDateModule,
    MatPaginatorModule, 
    MatMomentDateModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    NgxUiLoaderModule,  
    MatDialogModule,MatFormFieldModule
  
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
