import { Component } from '@angular/core';
import { SalaryService } from '../SalaryService/salary.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent {
  employeeData: any[] = [];
  showRecordOptions: boolean = true;
  selectedEmployee: any = {};
  selectedMonth: string = '';
  showReportOptions: boolean = true;
  showReportGrid: boolean = true;
  months: string[] = [];
  reportData: any[] = [];
  newSalaryAmount: number = 0;


  

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.generateReport(); 
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.generateReport(); 
  }

  

  constructor(
    private router: Router,
    private employeeService: SalaryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedEmployee = null;
    this.loadEmployeeData();
    this.loadMonths();
  }

  loadEmployeeData() {
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName);

    this.employeeService.getAllEmployees(tenantNameString).subscribe(
      (data: any[]) => {
        this.employeeData = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  loadMonths() {
    this.employeeService.getMonths().subscribe(
      (months: string[]) => {
        this.months = months;
      },
      (error: any) => {
        console.error('Error fetching months:', error);
      }
    );
  }

  generateReport() {
    if (this.selectedEmployee && this.selectedMonth) {
      const employeeFirstName = this.selectedEmployee.firstName; 
      const formattedMonth = encodeURIComponent(this.selectedMonth);
  
      this.employeeService.getSalaryData(employeeFirstName, formattedMonth).subscribe(
        (data: any[]) => {
          console.log('Salary Data:', data);
          this.reportData = data;
          this.showReportGrid = true;
        },
        (error: any) => {
          console.error('Error fetching salary data:', error);
          this.showReportGrid = false; 
        }
      );
    }
  }
  
}
