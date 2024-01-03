import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  baseServerUrl=" https://localhost:44318/api/"

  registerUser(){
    // this.http.post
  }
  getData(){
    return this.http.get("https://localhost:44318/GetAllProjectDetails")
  }
 
  addProject(data:any){
    return this.http.post('https://localhost:44318/createProject',data);
  }

  updateProjectDetail(data: any){
    console.log(data);
    return this.http.put('https://localhost:44318/updateProject',data);
  }
  
  getbyid(projectId: number){
     return this.http.get(`https://localhost:44318/GetProjectById?Id=${projectId}`);
  }
}