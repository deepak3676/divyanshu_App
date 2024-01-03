import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  constructor(private http: HttpClient) { }
 
 
  getTaskData() {
    return this.http.get("http://165.22.223.179:8080/api/TaskManagement/GetAll");
  }
 
  getUserTasksDetails(user: string, tenant
    :string) {
    return this.http.get(`http://165.22.223.179:8080/api/TaskManagement/GetByUserName?userName=${user}&tenant=${tenant}`)
  }
 
  getTenantTask(tenantName:any){
    return this.http.get(`http://165.22.223.179:8080/api/TaskManagement/GetTasksByTenantName?tenantName=${tenantName}`)
  }
  delete(id: number) {
    return this.http.delete(`http://165.22.223.179:8080/api/TaskManagement/Delete/${id}`)
  }
 
 
  addData(data: any) {
    return this.http.post(`http://165.22.223.179:8080/api/TaskManagement/Create`, data)
  }
 
 
  putData(data: any) {
    return this.http.put(`http://165.22.223.179:8080/api/TaskManagement/Update`, data)
  }
 
  getUserNames(tenantName:any){
    return this.http.get(`http://165.22.223.179:8080/api/TaskManagement/GetUsersByTenantName?tenantName=${tenantName}`)
  }
 
  getTaskById(use: number) {
    return this.http.get(`http://165.22.223.179:8080/api/TaskManagement/GetById?Id=${use}`)
  }
}