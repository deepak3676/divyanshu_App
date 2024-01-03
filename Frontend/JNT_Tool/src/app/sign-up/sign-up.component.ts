import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { TenantService } from '../tenant.service';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignupComponent {
  supabase = createClient(
    'https://lqviihvmwdkabqlpecxh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmlpaHZtd2RrYWJxbHBlY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMzgxNDAsImV4cCI6MjAxNDkxNDE0MH0.970stIqUsgdhPxejzbb-6R39pDOAx3J4rIGWz_c6ZAM'
  );
 
  signupForm = new FormGroup(
   
    {
    id: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', Validators.required),
    tenantName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });
 
  constructor(private router: Router, private tenantService: TenantService, private userservice: UserService, private snackBar: MatSnackBar) {}
 
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
 
    if (!password || !confirmPassword) {
      return null;
    }
 
    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }
 
  async onSubmit() {
 
    const existingUser = await this.supabase
      .from('usertable')
      .select('*')
      .eq('email', this.signupForm.value.email)
      .single();
 
    if (existingUser.data) {
      // User already exists
     
      Swal.fire({
        icon: 'error',
        title: 'Email Error',
        text: 'User with this email already exists',
      });
      return;
    }
    if (this.signupForm.valid) {
      const { firstName, lastName, email, department, tenantName, password } =
        this.signupForm.value;
 
      try {
        // Check if the tenant name already exists
        const existingTenants = (await this.tenantService
          .getAllTenants()
          .toPromise()) as any[];
 
        if (
          existingTenants &&
          existingTenants.some(
            (tenant: any) => tenant.tenantName === tenantName
          )
        ) {
          // Tenant name already exists, show an error message or take appropriate action
          Swal.fire({
            icon: 'error',
            title: 'Signup Error',
            text: 'Tenant name already exists',
          });
          return;
        }
 
        const userId = this.userservice.generateUserId();
        // Sign up the user with Supabase
        const signupResult = await this.supabase.auth.signUp({
          email: (email ?? '').toString(),
          password: (password ?? '').toString(),
        });
 
        if (signupResult.error) {
          console.error('Supabase signup error:', signupResult.error);
          return;
        }
 
        // After successful signup, create a new tenant
        const tenantRequest = {
          id: 0,
          userId,
          email,
          department,
          firstName,
          lastName,
          password,
          tenantName,
        };
       
        const { id,confirmPassword, ...dataWithoutId } = this.signupForm.value;
        const { data: userData, error: userError } = await this.supabase
        .from('usertable')
        .upsert([{
          ...dataWithoutId,
          userId: userId, // Include the userId in the upsert operation
        }]);
           
       
 
        if (userError) {
          console.error('Supabase user creation error:', userError);
          return;
        }
 
        // Call the createTenants API with the extracted data
        this.tenantService.createTenants(tenantRequest).subscribe(
          (data) => {
            // Handle success response from createTenant API
            console.log('createTenant API response:', data);
          },
          (error) => {
            // Handle error response from createTenant API
            console.error('createTenant API error:', error);
          }
        );
 
        // Successful signup
        this.snackBar.open('Signup Successful', '', { duration: 3000, horizontalPosition: 'right', panelClass: ["success-snackbar"] });
 
        // Redirect to the login page or another appropriate route
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Supabase error:', error);
      }
    }
  }
}