import { Component } from '@angular/core';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../services/task.service';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TenantService } from '../tenant.service';
import { Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent {
  
  //Variables
  
  taskId: number = 0;
  tasks: any[] = [];
  store3: Date = new Date();
  myuserName: string = '';
  userTaskBoolean = false;
  userTasks: FormGroup | any;
  dataCame: boolean = false;
  isAdminLoggedIn: boolean = false;
  userTasksDetails: any[] = []
  tenant: string = localStorage.getItem('tenantName') || ''
  userSuggestions: string[] = [];
  suggestions: string[] = [];
  filteredSuggestions: string[] = [];
  materialDialog = false;
  showSpecificData:boolean=false;


  // Constructor
  constructor(private router:Router,private serve: TaskService,private fb:FormBuilder, private dialog: MatDialog,private baseserve:TenantService) {
    this.reloadSite();
    this.showSpecificData=false;

    this.userTasks = this.fb.group({
      userName: ['', Validators.required],
    });
  
    this.baseserve.getUserByTenant(this.tenant).subscribe((result) => {
      if (Array.isArray(result)) {
        // Filter out non-string values
        this.suggestions = result.filter(item => typeof item === 'string') as string[];
        console.log(this.suggestions);
      } else {
        console.error('Unexpected response format from the service:', result);
      }
    });


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Close the dialog when navigating to another route
        this.dialog.closeAll();
      }
    });
  }
  
  showallData(){
    this.showSpecificData=false;
  }

  // Toggle to show user-specific tasks
  userTaskTab() {
    this.userTaskBoolean = true;
  }

  // Method to get user tasks based on the provided username
getUserTasks(user: string) {
  this.showSpecificData=true;
  const userName = encodeURIComponent(user);
  this.serve.getUserTasksDetails(userName,this.tenant).subscribe((result) => {
    this.dataCame = true;
    this.userTasksDetails = result as any;

  })
}


  
  openConfirmationDialog(taskID: number): void {
    debugger;
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serve.delete(taskID).subscribe(() => {
          this.reloadSite();
          this.reloadSite2();
          Swal.fire({
            icon: 'success',
            title: 'Delete Successful!',
            text: 'Task deleted successfully.',
          });
        });
      }
    });
  }


  // deleteTask(taskId: number): void {
  //   this.serve.delete(taskId).subscribe(() => {
  //     this.reloadSite();
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Delete Successful!',
  //       text: 'Task deleted successfully.',
  //     });
  //   });
  // }
  
  
  



  // Function to edit a task
  editTask(task: any) {
    const dialogRef = this.dialog.open(TaskUpdateComponent, {
      width: '600px',
      data: {
        data: task,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        const index = this.tasks.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.tasks[index] = result;
        }
      }
    });
  }

  
  
  
  // Function to open a dialog for adding a new task
  openDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        this.tasks.push(result);
      }
    });

    this.reloadSite();
  }

 
  // Reload site data after every functionality
  reloadSite() {
    if (this.tasks.length == 1) {
      this.tasks = []
    }
  
    this.serve.getTenantTask(this.tenant).subscribe((result) => {
      this.tasks = result as any;
    });


  }

  reloadSite2(){
    this.serve.getUserTasksDetails(this.userTasks.value.userName,this.tenant).subscribe((result) => {
      this.userTasksDetails = result as any;
    });


}

// deleteTask2(data:any){
//   this.serve.delete(data).subscribe(() => {
//     this.reloadSite();
//   });
// }

   // Function to filter suggestions based on user input
 filterSuggestions(value: string): string[] {
  const filterValue = value.toLowerCase();
  const filtered = this.suggestions.filter((suggestion) => suggestion.toLowerCase().includes(filterValue));
  this.filteredSuggestions=filtered
  return filtered;
}

// Display function for mat-autocomplete
displayFn(value: string): string {
  return value || '';
}
}
