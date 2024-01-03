import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  
  constructor(private http: HttpClient) { }
 
 
  getAllAttendenceWithManagement() {
    return this.http.get('https://localhost:44318/api/Attendance/GetAllManagementAndAttendance');
  }
 
  getAllEmployees(data:string) {
    return this.http.get(`https://localhost:44318/api/Attendance/GetAllFirstNamesByTenant?tenantName=${data}`);
  }
 
  getbyMonthName(selectedMonth: string, tenantName: string) {
 
    return this.http.get(`https://localhost:44318/api/Attendance/GetAllManagementAndAttendanceByMonthbytenantName?tenantName=${tenantName}&monthName=${selectedMonth}`);
  }
  getAlldatabytenantName(tenantName: string){
    return this.http.get(`https://localhost:44318/api/Attendance/GetAllManagementAndAttendanceBytenant?tenantName=${tenantName}`);

  }
}

