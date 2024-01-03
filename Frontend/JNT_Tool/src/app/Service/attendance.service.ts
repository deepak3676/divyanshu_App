import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  
  constructor(private http: HttpClient) { }
 
 
  getAllAttendenceWithManagement() {
    return this.http.get('http://165.22.223.179:8080/api/Attendance/GetAllManagementAndAttendance');
  }
 
  getAllEmployees(data:string) {
    return this.http.get(`http://165.22.223.179:8080/api/Attendance/GetAllFirstNamesByTenant?tenantName=${data}`);
  }
 
  getbyMonthName(selectedMonth: string, tenantName: string) {
 
    return this.http.get(`http://165.22.223.179:8080/api/Attendance/GetAllManagementAndAttendanceByMonthbytenantName?tenantName=${tenantName}&monthName=${selectedMonth}`);
  }
  getAlldatabytenantName(tenantName: string){
    return this.http.get(`http://165.22.223.179:8080/api/Attendance/GetAllManagementAndAttendanceBytenant?tenantName=${tenantName}`);

  }
}

