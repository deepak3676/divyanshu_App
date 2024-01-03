import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from '../Service/attendance.service';

 
@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  employeeNames: string[] = [];
  showTable: boolean = true;
  selectedMonth: string = '';
  selectedEmployee: string = '';
  gridData: any[] = [];
  attendanceForm: FormGroup;
  showDropdown: boolean = true;
  selectAll: boolean = false;
 
  constructor(private router: Router, private formBuilder: FormBuilder, private serve: AttendanceService) {
    this.attendanceForm = this.formBuilder.group({
      selectedMonth: [''],
      selectedEmployee: ['']
    });
  }
 
  ngOnInit(): void {
    this.loadEmployeeData();
    this.loadData();
  }
 
  loadEmployeeData() {
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName);
 
    this.serve.getAllEmployees(tenantNameString).subscribe(
      (employee: any | any[]) => {
        this.employeeNames = employee;
        console.log(employee);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
 
  populateEmployeeNames() {
    this.employeeNames = Array.from(new Set(this.gridData.map(record => record.management.firstName)));
  }
 
  formatDate(dateTimeString: string): string {
    if (dateTimeString) {
      const date = new Date(dateTimeString);
      const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      return `${dateString} ${timeString}`;
    }
    return '';
  }
 
  selectEmployee(employee: string) {
    this.selectedEmployee = employee;
    this.generateEReport();
    this.loadEmployeeData();
    this.setValueOfSelectedMonth('');
  }
 
  getbyMonthName(selectedMonth: string) {
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName);
 
    this.serve.getbyMonthName(selectedMonth, tenantNameString).subscribe(
      (result: any) => {
        console.log(result);
 
        if (this.selectedEmployee) {
          const [selectedFirstName, selectedLastName] = this.selectedEmployee.split(' ');
 
          this.gridData = result.filter((record: { management: { firstName: string; lastName: string; }; }) =>
            record.management.firstName === selectedFirstName &&
            record.management.lastName === selectedLastName
          );
          this.showTable = true;
          this.selectedMonth = selectedMonth;

          if (this.selectedEmployee === 'Select All Users')

          {
          this.selectedEmployee = '';
            this.selectedMonth = selectedMonth;
          }
        } else {
          this.gridData = result as any;
          this.showTable = true;
          this.selectedEmployee = '';
          this.selectedMonth = selectedMonth;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
  setValueOfSelectedMonth(value: string) {
    const selectedMonthControl = this.attendanceForm.get('selectedMonth');
    if (selectedMonthControl) {
      selectedMonthControl.setValue(value);
    }
  }
 
  private loadData() {
    this.populateEmployeeNames();
    this.loadEmployeeData();
  }
  selectAllEmployees() {

    this.selectedEmployee = 'Select All Users'; 
    this.selectedMonth = ''; 
    const tenantName = localStorage.getItem('tenantName') || '';

    this.serve.getAlldatabytenantName(tenantName).subscribe((result) => {
      if (Array.isArray(result)) {
        this.gridData = result;
        this.showTable = true;
        this.selectedMonth = '';
        console.log("Selected Month after clearing:", this.selectedMonth);
      }
    });
  }
  
  
  generateEReport() {
    if (this.selectedEmployee) {
      const [selectedFirstName, selectedLastName] = this.selectedEmployee.split(' ');
 
      this.serve.getAllAttendenceWithManagement().subscribe((result) => {
        if (Array.isArray(result)) {
          this.gridData = result.filter((record) => {
            return record.management.firstName === selectedFirstName &&
                   record.management.lastName === selectedLastName;
          });
          this.showTable = true;
          this.selectedMonth = '';
          console.log("Selected Month after clearing:", this.selectedMonth);
        }
      });
    }
  }
}
