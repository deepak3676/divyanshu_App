import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeaveApplication } from '../model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LmsService {

  private apiBaseUrl = 'https://localhost:7126/api/LeaveManagementSystem';

  constructor(private http: HttpClient) { }

  getAllManagerNames(tenantName: string): Observable<any[]> {
    const url = `${this.apiBaseUrl}/GetAllNames?tenantName=${tenantName}`;
    return this.http.get<any[]>(url);
  }
  
  
  submitLeaveApplication(leaveApplicationData: LeaveApplication) {
    return this.http.post(`https://localhost:7126/api/LeaveManagementSystem/CreateApplyLeave`, leaveApplicationData);
  }
  
  getLeaveStatusByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7126/api/LeaveManagementSystem/employee/${userId}`);
  }
  
  updateLeaveApplication(leaveApplication: LeaveApplication): Observable<any> {
   
    return this.http.put(`https://localhost:7126/api/LeaveManagementSystem/UpdateApplyLeave`
    , leaveApplication, { responseType: 'text' });
  }
  deleteLeave(id: number) {
    // Assuming your API expects a DELETE request to delete a leave entry
  
    return this.http.delete(`https://localhost:7126/api/LeaveManagementSystem/DeleteApplyLeave/${id}`);
  }
 
  
  updateLeaveStatus(userId: number, startDate: Date, endDate: Date, status: string, managercomment: string): Observable<any> {
    const updateUrl = `${this.apiBaseUrl}/UpdateLeaveStatus/${userId}/${startDate}/${endDate}/${status}/${managercomment}`;

    // Assuming your backend expects a JSON object in the request body
    const data = { managercomment }; // Wrapping managercomment in an object

    // Adding headers if necessary
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(updateUrl, data, { headers });
  }
  
  
  
    // Send a PUT request to the API with an empty body
 
  
 
  GetLeaveStatusForManagedUsers(managerName: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7126/api/LeaveManagementSystem/GetLeaveStatusForManagedUsers/${managerName}`);
  }
}
