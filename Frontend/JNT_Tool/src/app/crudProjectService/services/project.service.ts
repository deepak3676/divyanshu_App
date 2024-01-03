import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  baseServerUrl=" https://localhost:7126/api/"

  registerUser(){
    // this.http.post
  }
  getData(){
    return this.http.get("https://localhost:7126/GetAllProjectDetails")
  }
 
  addProject(data:any){
    return this.http.post('https://localhost:7126/createProject',data);
  }

  updateProjectDetail(data: any){
    console.log(data);
    return this.http.put('https://localhost:7126/updateProject',data);
  }
  
  getbyid(projectId: number){
     return this.http.get(`https://localhost:7126/GetProjectById?Id=${projectId}`);
  }
}