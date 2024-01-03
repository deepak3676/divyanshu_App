import { Component } from '@angular/core';
import { SalaryService } from 'src/app/SalaryReport/SalaryService/salary.service';
import { TenantService } from 'src/app/tenant.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css'],
})
export class HRComponent {
  isSalaryPopupOpen = false;
  salaryRecord = {
    employeeId: '',
    employeeName: '',
    salaryMonth: '',
    salary: '',
    leaves: '',
    deductions: '',
    netPay: '',
  };

  tenants: any[] = [];

  constructor(
    private salaryService: SalaryService,
    private tenantData: TenantService
  ) {}
  ngOnInit() {
    this.fetchTenants();
    const storedFirstName = localStorage.getItem('tenantName');
  }

  validateKey(event: any) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  validatePaste(event: any) {
    const clipboardData = (event.clipboardData ||
      (window as any).clipboardData) as DataTransfer;
    const pastedText = clipboardData.getData('text');

    if (!/^\d+$/.test(pastedText)) {
      event.preventDefault();
    }
  }

  async fetchTenants() {
    const storedFirstName = localStorage.getItem('tenantName');

    // Fetch all tenants from the service
    this.tenantData.getAllTenants().subscribe((data: any) => {
      // Filter tenants based on the condition
      this.tenants = data.filter(
        (tenant: any) => tenant.tenantName === storedFirstName
      );
    });
  }

  openSalaryPopup(user: any) {
    console.log('Opening salary popup');
    this.salaryRecord.employeeId = user.id;
    this.salaryRecord.employeeName = `${user.firstName} ${user.lastName}`;
    this.isSalaryPopupOpen = true;
  }

  closeSalaryPopup() {
    console.log('Closing salary popup');
    this.salaryRecord = {
      employeeId: '',
      employeeName: '',
      salaryMonth: '',
      salary: '',
      leaves: '',
      deductions: '',
      netPay: '',
    };
    this.isSalaryPopupOpen = false;
  }

  saveSalary() {
    if (
      this.salaryRecord.salary !== undefined &&
      this.salaryRecord.leaves !== undefined
    ) {
      const maxLeaves = 30;
  
      // Check if the input is non-empty
      if (this.salaryRecord.leaves.trim() !== '') {
        // Extract the numeric part (up to 2 digits) and optional decimal and digit
        const regexResult = this.salaryRecord.leaves.match(/^\d{0,2}(\.\d{0,1})?$/);
        const sanitizedLeaves = regexResult ? regexResult[0] : '';
  
        // If the entered leaves exceed the maximum, set it to the maximum
        this.salaryRecord.leaves =
          parseFloat(sanitizedLeaves) > maxLeaves
            ? maxLeaves.toString()
            : sanitizedLeaves;
  
        // Remove any non-numeric and non-decimal characters
        this.salaryRecord.leaves = this.salaryRecord.leaves.replace(/[^\d.]/g, '');
      } else {
        // Clear the leaves field if it's empty
        this.salaryRecord.leaves = '';
      }
  
      const enteredLeaves = parseFloat(this.salaryRecord.leaves);
      const dailySalary = parseFloat(this.salaryRecord.salary) / 30;
      const leaveDeduction = dailySalary * enteredLeaves;
  
      // Use Math.floor() to round down the values
      this.salaryRecord.deductions = Math.floor(leaveDeduction).toString();
  
      // Calculate net pay for fractional leaves
      if (enteredLeaves >= maxLeaves) {
        this.salaryRecord.netPay = '0';
      } else {
        // Adjusted calculation for fractional leaves
        this.salaryRecord.netPay = Math.floor(
          parseFloat(this.salaryRecord.salary) - leaveDeduction
        ).toString();
      }

      this.salaryService.addSalaryRecord(this.salaryRecord).subscribe(
        (response) => {
          this.salaryRecord = {
            employeeId: '',
            employeeName: '',
            salaryMonth: '',
            salary: '',
            leaves: '',
            deductions: '',
            netPay: '',
          };
        },
        (error) => {
          console.error('Error adding salary record', error);

          if (error.error) {
            try {
              const errorData = JSON.parse(error.error);

              // Display the error message to the user
              console.error('Server error:', errorData.title);
              // Perform additional actions if needed
            } catch (parseError) {
              console.error('Error parsing JSON error response', parseError);
              // Handle parsing error of error response appropriately
            }
          } else {
            console.error('An unexpected error occurred.');
          }
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Salary added successfully.',
      });
      // Close the popup
      this.closeSalaryPopup();
      this.salaryRecord = {
        employeeId: '',
        employeeName: '',
        salaryMonth: '',
        salary: '',
        leaves: '',
        deductions: '',
        netPay: '',
      };
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
    }
  }

  updateDeduction() {
    if (
      this.salaryRecord.salary !== undefined &&
      this.salaryRecord.leaves !== undefined
    ) {
      const maxLeaves = 30;
  
      // Check if the input is non-empty
      if (this.salaryRecord.leaves.trim() !== '') {
        // Extract the numeric part (up to 2 digits) and optional decimal and digit
        const regexResult = this.salaryRecord.leaves.match(/^\d{0,2}(\.\d{0,1})?$/);
        const sanitizedLeaves = regexResult ? regexResult[0] : '';
  
        // If the entered leaves exceed the maximum, set it to the maximum
        this.salaryRecord.leaves =
          parseFloat(sanitizedLeaves) > maxLeaves
            ? maxLeaves.toString()
            : sanitizedLeaves;
  
        // Remove any non-numeric and non-decimal characters
        this.salaryRecord.leaves = this.salaryRecord.leaves.replace(/[^\d.]/g, '');
      } else {
        // Clear the leaves field if it's empty
        this.salaryRecord.leaves = '';
      }
  
      const enteredLeaves = parseFloat(this.salaryRecord.leaves);
      const dailySalary = parseFloat(this.salaryRecord.salary) / 30;
      const leaveDeduction = dailySalary * enteredLeaves;
  
      // Use Math.floor() to round down the values
      this.salaryRecord.deductions = Math.floor(leaveDeduction).toString();
  
      // Calculate net pay for fractional leaves
      if (enteredLeaves >= maxLeaves) {
        this.salaryRecord.netPay = '0';
      } else {
        // Adjusted calculation for fractional leaves
        this.salaryRecord.netPay = Math.floor(
          parseFloat(this.salaryRecord.salary) - leaveDeduction
        ).toString();
      }
    }
}
}