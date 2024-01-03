// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateButtonComponent } from '../update-button/update-button.component';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ProjectService } from '../../crudProjectService/services/project.service';
import { projects } from '../../crud{ProjectModel/model/dataType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showContent: boolean = true;
  showProjectsTable: boolean = true;
  buttonClicked: boolean = true;
  editedForm: FormGroup | any

  tenantName=localStorage.getItem('tenantName');
  constructor(private dialog: MatDialog, private serve: ProjectService, private fb: FormBuilder, private router: Router,
   )
    {
  
    serve.getData().subscribe((result) => {
      this.projects = (result as any[]).filter(project => project.status == 'Active' && project.tenantName == this.tenantName);
    })
     
  }
  ngOnInit(){
    console.log("this"+this.tenantName);
    
  }
  
  // Example data, replace with your actual data
  projects: projects[] = [];

  showProjects() {
    
    this.showContent = true;
    this.showProjectsTable = true;
  }

  //confirmation dialog component start
  openConfirmationDialog(project: any): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        project.Status = 'Not Active';
        this.serve.updateProjectDetail(project).subscribe(() => {
          this.projects = this.projects.filter(p => p !== project);
          Swal.fire({
            icon: 'success',
            title: 'Delete Successful!',
            text: 'Project details deleted successfully.',
          });
        });
      }
    });
  }

  //confirmation dialog end.



  //create project dialog start
  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '600px',
      data: {
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        this.projects.push(result);
      }
    });
  }
  //end of create project dialog



  //dialog box for update
  openUpdateProjectDialog(project: any): void {
    const dialogRef = this.dialog.open(UpdateButtonComponent, {

      width: '600px',
      data: {
        data: project,

      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        // Find the index of the updated project in the projects array
        const index = this.projects.findIndex(p => p.projectId === result.projectId);

        if (index !== -1) {
          // Update the projects array with the updated project data
          this.projects[index] = result;
        }
      }
    });

  }

  //end update dialog region  

  onLogoutClick() {
    localStorage.removeItem('isUserLoggeedIn')
    this.router.navigate(['/log-in'])
  }

}

