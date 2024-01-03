import { Component, HostListener  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskDetails: FormGroup | any;
  users: any[] = []
  isAdminLoggedIn = false;
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private serve: TaskService, private baseServe:TenantService
  ) {

    // Initialize form controls
    this.taskDetails = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(100)]],
      taskDescription: ['',[ Validators.required, Validators.maxLength(500)]],
      taskStartTime: ['', Validators.required],
      taskEndTime: ['', Validators.required],
      userName: ['', Validators.required]
    }, { validator: this.dateValidator.bind(this) });


    
    // Load usernames based on user role
    this.loadUsernames();

  }

  async loadUsernames() {
    const tenantName= localStorage.getItem('tenantName')||''
    this.baseServe.getUserByTenant(tenantName).subscribe((result) => {
      if (typeof result === 'object' && result !== null) {
        this.users = Object.values(result).map((value: string) => ({ value, viewValue: value }));
      } else {
        console.error('Unexpected data format. Expected an object.');
      }
    });
  }


  

  onSaveClick(data: any) {
    
    // Save data and close the dialog
    data.tenantName=localStorage.getItem('tenantName')
    this.serve.addData(data).subscribe((result) => {
      this.dialogRef.close(result);
    });

  }


  onCancelClick() {
    // Close the dialog without saving
    this.dialogRef.close();
  }

  dateValidator(form: FormGroup) {
    
    const startDateControl = form.get('taskStartTime');
    const endDateControl = form.get('taskEndTime');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;
  
      // Get the current date in the local timezone
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
  
      // Parse the selected start date and end date strings to Date objects
      const parsedStartDate = startDate ? new Date(startDate) : null;
      const parsedEndDate = endDate ? new Date(endDate) : null;
  
      // Check if the start date is provided
      if (!parsedStartDate) {
        startDateControl.setErrors({ requiredError: 'Start date is required.' });
      } else {
        // Check if the selected start date is in the past or the same as the current date
        if (parsedStartDate < currentDate) {
          startDateControl.setErrors({ pastDateError: 'Please choose a date from today or later.' });
        } else {
          startDateControl.setErrors(null);
        }
      }
  
      // Check if the end date is provided
      if (!parsedEndDate) {
        endDateControl.setErrors({ requiredError: 'End date is required.' });
      } else {
        // Check if the end date is before the start date or the same as the start date
        if (parsedStartDate && parsedEndDate < parsedStartDate) {
          endDateControl.setErrors({ dateError: 'End date must be after the start date.' });
        } else {
          endDateControl.setErrors(null);
        }
      }
    }
  }
  
}
