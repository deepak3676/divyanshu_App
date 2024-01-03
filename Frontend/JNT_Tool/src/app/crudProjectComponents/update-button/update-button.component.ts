// update-button.component.ts

import { Component, OnInit,Inject, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../crudProjectService/services/project.service';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css']
})
export class UpdateButtonComponent implements OnInit {
  tanantName=localStorage.getItem('tenantName');
  updateForm: FormGroup | any;
  matcher = new MyErrorStateMatcher();
  countries: string[] = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'];

  constructor(public dialogRef: MatDialogRef<UpdateButtonComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, 
  private fb: FormBuilder, private serve:ProjectService) {
    
  }
    ngOnInit() {
      this.initializeForm();
      this.populateForm();
    }

  initializeForm() {
    this.updateForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(100)]],
      client: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: [new Date(), Validators.required],
      endDate: [Validators.required, this.endDateValidator.bind(this)],
      country: ['',Validators.required],
      budget: ['', [Validators.max(999999999)]],
      status: [false],
    },{ validators: this.dateRangeValidator.bind(this) });
  }
  populateForm() {

    this.serve.getbyid(this.data.data.projectId).subscribe((result) => {
      
      this.updateForm.patchValue({
        projectName:(result as any).projectName,
        client: (result as any).client,
        startDate: (result as any).startDate,
        endDate: (result as any).endDate,
        country:(result as any).country,
        budget:(result as any).budget,
        status: (result as any).status,
      });
      })
  
  }
  endDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = this.updateForm?.get('startDate')?.value;
    const endDate = control.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { 'endDateBeforeStartDate': true };
    }
    return null;
  }

  dateRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { 'dateRangeInvalid': true };
    }

    return null;
  }
  onSaveClick(data1:any) {
   
    data1.status = this.updateForm.get('status').value ? 'Active' : 'Not Active';
    
    data1.projectId=this.data.data.projectId;
    data1.tenantName=this.tanantName;
    
    this.serve.updateProjectDetail(data1).subscribe((result)=>{
      this.dialogRef.close(result);
    });

    }

  onCancelClick() {
    this.dialogRef.close();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}